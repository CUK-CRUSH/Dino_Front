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

const PlayList: React.FC<EditPlsyListDTO> = () => {
  const isEditing = useSelector(
    (state: RootState) => state.editPlaylistToggle.isEditing
  );
  const musicData = useSelector((state: RootState) => state.musicAdd);

  const [uploadImage, setUploadImage] = useState<string | null>(null);
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [username, setUsername] = useState<string | null>(null);

  const [playlistName, setPlaylistName] = useState("");
  const [musicList, setMusicList] = useState<any>([]);

  const [hasError, setHasError] = useState<boolean>(false);

  const { playlistId } = useParams<{ playlistId: string }>();

  const { toast } = useSelector((state: RootState) => state.toast);
  // 쿠키에서 유저 id 가져오기
  const [cookies] = useCookies(["accessToken"]);
  const token = cookies.accessToken;

  const handleUploadImage = (image: string) => setUploadImage(image);

  const {
    handleEditClick,
    handleSaveClick,
    handleCancelClick,
    handleDeleteClick,
  } = UsePlayListEditor({
    playlists,
    token,
    playlistName,
    musicData,
    playlistId,
    username,
  });

  const fetchPlaylist = useCallback(async () => {
    // 항상 로컬 스토리지에서 username을 가져옴
    let usernameToUse = localStorage.getItem("username") || "defaultUsername";

    try {
      const playlist = await getPlayList(usernameToUse);
      const musicAPIData = await getMusicList(Number(playlistId));

      setUsername(usernameToUse);
      setPlaylists(playlist.data);
      setMusicList(musicAPIData);
    } catch (error) {
      console.error(error);
      setHasError(true);
    }
  }, [playlistId]);

  useEffect(() => {
    fetchPlaylist();
  }, [fetchPlaylist, musicData]);

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
          playlistName={playlistName}
          musicData={musicData}
          playlistId={playlistId}
          username={username}
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
      />

      <MusicTitle
        playlists={playlists}
        titlechange={(newTitle) => {
          setPlaylistName(newTitle);
        }}
        isEditing={isEditing}
        playlistId={playlistId}
      />

      <MusicDataRow
        isEditing={isEditing}
        musicList={musicList}
        playlistId={playlistId}
        username={username}
        token={token}
      />

      {isEditing && musicList.data?.length < 9 && (
        <PlusButton playlists={playlists} username={username} />
      )}
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
