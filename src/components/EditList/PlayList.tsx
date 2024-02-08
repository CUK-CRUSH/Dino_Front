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
import { getPlayList } from "@api/playlist-controller/playlistControl";
import { getMusicList } from "@api/music-controller/musicControl";
import { useParams } from "react-router-dom";
import ToastComponent from "@components/Toast/Toast";
import NotFound from "@pages/NotFound/NotFonud";
import Footer from "@components/Layout/footer";
import { useRecoilState, useSetRecoilState } from "recoil";
import { playlistNameState } from "@atoms/Playlist/playlistName";
import { getMemberUsername } from "@api/member-controller/memberController";
import { musicListState } from "@atoms/Musics/MusicList";

const PlayList: React.FC<EditPlsyListDTO> = () => {
  const isEditing = useSelector(
    (state: RootState) => state.editPlaylistToggle.isEditing
  );
  const musicData = useSelector((state: RootState) => state.musicAdd);

  const [uploadImage, setUploadImage] = useState<string | null>(null);
  const [memberId, setMemberId] = useState<number | null>(null);
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [usernames, setUsername] = useState<string | null>(null);

  const { username } = useParams<{ username: string | undefined }>();
  const setPlaylistName = useSetRecoilState(playlistNameState);
  const [musicList, setMusicList] = useRecoilState(musicListState);

  const [hasError, setHasError] = useState<boolean>(false);

  const { playlistId } = useParams<{ playlistId: string }>();

  const { toast } = useSelector((state: RootState) => state.toast);
  // 쿠키에서 유저 id 가져오기
  const [cookies] = useCookies(["accessToken"]);
  const token = cookies.accessToken;

  const handleUploadImage = (image: string) => setUploadImage(image);
  const fetchPlaylist = useCallback(async () => {
    // 항상 로컬 스토리지에서 username을 가져옴

    try {
      const member = await getMemberUsername(username);
      const playlist = await getPlayList(username);
      const musicAPIData = await getMusicList(Number(playlistId));

      setMemberId(member.data.id);
      setUsername(username || null);
      setPlaylists(playlist.data);
      setMusicList(musicAPIData);

      const selectedPlaylist = playlist.data.find(
        (pl: any) => pl.id === Number(playlistId)
      );
      if (selectedPlaylist) {
        setPlaylistName(selectedPlaylist.playlistName);
      }
    } catch (error) {
      console.error(error);
      setHasError(true);
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [setMusicList]);

  const {
    handleEditClick,
    handleSaveClick,
    handleCancelClick,
    handleDeleteClick,
  } = UsePlayListEditor({
    playlists,
    token,
    musicData,
    playlistId,
    usernames,
    fetchPlaylist,
    setPlaylistName,uploadImage
  });

  useEffect(() => {
    fetchPlaylist();
  }, [fetchPlaylist]);

  if (hasError) {
    return <NotFound />;
  }
  return (
    <div className="h-full w-full scrollbar-hide overflow-scroll flex flex-col bg-black text-white font-medium leading-[18px]">
      {!isEditing && (
        <MainEditButton
          playlists={playlists}
          uploadImage={uploadImage}
          token={token}
          musicData={musicData}
          playlistId={playlistId}
          usernames={usernames}
          fetchPlaylist={fetchPlaylist}
          setPlaylistName={setPlaylistName}
          memberId={memberId}
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
        playlistId={playlistId}
        token={token}
        fetchPlaylist={fetchPlaylist}
      />
      <MusicTitle isEditing={isEditing} />
      <MusicDataRow
        isEditing={isEditing}
        playlistId={playlistId}
        usernames={usernames}
        token={token}
        fetchPlaylist={fetchPlaylist}
      />
      {isEditing && musicList.data?.length + musicData.musics.length < 9 && (
        <PlusButton
          playlists={playlists}
          usernames={usernames}
          playlistId={playlistId}
        />
      )}
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
