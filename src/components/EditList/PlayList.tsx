import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UsePlayListEditor } from "@hooks/UsePlayListEditor";
import { RootState } from "@store/index";
import { EditPlsyListDTO } from "types/EditplayList";
import { EditPlaylistControls } from "@components/EditList/Button/EditPlaylistControl";
import { MusicDataRow } from "@components/EditList/MusicList/MusicDataRow";
import { PlusButton } from "@components/EditList/Button/PlusButton";
import ShowImage from "@components/EditList/EditImage/ShowImage";
import { MainEditButton } from "@components/EditList/Button/MainEditButton";
import { MusicTitle } from "@components/EditList/MusicList/MusicTitle";
import { useCookies } from "react-cookie";
import { getSinglePlayList } from "@api/playlist-controller/playlistControl";
import { getMusicList } from "@api/music-controller/musicControl";
import { useParams } from "react-router-dom";
import ToastComponent from "@components/Toast/Toast";
import NotFound from "@pages/NotFound/NotFonud";
import Footer from "@components/Layout/footer";
import { useRecoilState, useSetRecoilState } from "recoil";
import { playlistNameState } from "@atoms/Playlist/playlistName";
import { getMemberUsername } from "@api/member-controller/memberController";
import { musicListState } from "@atoms/Musics/MusicList";
import { userNameState } from "@atoms/Playlist/username";
import { playlistIdState } from "@atoms/Playlist/playlistId";
import { memberIdState } from "@atoms/Playlist/memberId";
import { tokenState } from "@atoms/Playlist/token";
import Recommendation from "@components/Recommend/Recommendation";

const PlayList: React.FC<EditPlsyListDTO> = () => {
  const isEditing = useSelector(
    (state: RootState) => state.editPlaylistToggle.isEditing
  );
  const musicData = useSelector((state: RootState) => state.musicAdd);

  const [uploadImage, setUploadImage] = useState<string | null>(null);
  const setMemberId = useSetRecoilState(memberIdState);
  const [playlists, setPlaylists] = useState<any[]>([]);

  // 유저이름
  const { username: paramUsername } = useParams<{
    username: string | undefined;
  }>();
  const setUsernames = useSetRecoilState(userNameState);
  //
  // console.log(playlists);
  const setPlaylistName = useSetRecoilState(playlistNameState);
  const [musicList, setMusicList] = useRecoilState(musicListState);

  const [hasError, setHasError] = useState<boolean>(false);

  // 플레이리스트 아이디
  const { playlistId } = useParams<{ playlistId: string }>();
  const setPlaylistId = useSetRecoilState(playlistIdState);
  //

  const { toast } = useSelector((state: RootState) => state.toast);
  // 쿠키에서 유저 id 가져오기
  const [cookies] = useCookies(["accessToken"]);

  const setToken = useSetRecoilState(tokenState);
  const handleUploadImage = (image: string) => setUploadImage(image);
  const fetchPlaylist = useCallback(async () => {
    // 항상 로컬 스토리지에서 username을 가져옴

    try {
      const member = await getMemberUsername(paramUsername);
      setMemberId(member.data.id);
      setUsernames(paramUsername || "");

      const playlist = await getSinglePlayList(Number(playlistId));
      setPlaylists(playlist.data);
      setPlaylistName(playlist.data.playlistName);

      const musicAPIData = await getMusicList(Number(playlistId));

      setMusicList(musicAPIData);
    } catch (error) {
      console.error(error);
      setHasError(true);
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);
  const {
    handleEditClick,
    handleSaveClick,
    handleCancelClick,
    handleDeleteClick,
  } = UsePlayListEditor({
    playlists,
    fetchPlaylist,
    setPlaylistName,
    uploadImage,
  });

  useEffect(() => {
    setPlaylistId(Number(playlistId));
    setToken(cookies.accessToken);

    fetchPlaylist();
  }, [playlistId, fetchPlaylist, setPlaylistId]);

  if (hasError) {
    return <NotFound />;
  }
  console.log(playlistId);

  return (
    <div className="h-full w-full scrollbar-hide overflow-scroll flex flex-col bg-black text-white font-medium leading-[18px]">
      {!isEditing && (
        <MainEditButton
          playlists={playlists}
          uploadImage={uploadImage}
          fetchPlaylist={fetchPlaylist}
          setPlaylistName={setPlaylistName}
        />
      )}
      {isEditing && (
        <EditPlaylistControls
          isEditing={isEditing}
          onSave={() => handleSaveClick(uploadImage)}
          onCancel={handleCancelClick}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
      )}
      <ShowImage
        aspectRatio={1}
        onCrop={handleUploadImage}
        playlists={playlists}
        isEditing={isEditing}
        fetchPlaylist={fetchPlaylist}
      />

      <MusicTitle isEditing={isEditing} />
      <MusicDataRow isEditing={isEditing} fetchPlaylist={fetchPlaylist} />
      {isEditing && musicList.data?.length + musicData.musics.length < 9 && (
        <PlusButton playlists={playlists} />
      )}
      <Recommendation />
      <Footer bgColor="black" />
      {toast === "editPlayList" && (
        <ToastComponent
          background="white"
          text="플레이리스트가 수정되었습니다!"
        />
      )}
    </div>
  );
};

export default PlayList;
