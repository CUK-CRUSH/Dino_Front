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
import useDecodedJWT from "@hooks/useDecodedJWT";
import { getMember } from "@api/member-controller/memberController";
import { getPlayList } from "@api/playlist-controller/playlistControl";
import { getMusicList } from "@api/music-controller/musicControl";
import { useParams } from "react-router-dom";
import ToastComponent from "@components/Toast/Toast";

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

  const { playlistId } = useParams<{ playlistId: string }>();
  const { toast } = useSelector((state: RootState) => state.toast);
  const userId = useSelector((state: RootState) => state.userId.value);
  const [compareId, setCompareId] = useState<number | null>(null);
  // 쿠키에서 유저 id 가져오기
  const [cookies] = useCookies(["accessToken"]);
  const token = cookies.accessToken;
  const decodedToken = useDecodedJWT(token);
  const id = decodedToken.sub;

  const handleUploadImage = (image: string) => setUploadImage(image);

  const {
    handleEditClick,
    handleSaveClick,
    handleCancelClick,
    handleDeleteClick,
  } = UsePlayListEditor(
    playlists,
    uploadImage,
    token,
    playlistName,
    musicData,
    playlistId,
    username
  );

  const fetchPlaylist = useCallback(
    async (id: number) => {
      const member = await getMember(id);

      const playlist = await getPlayList(member.data.username);

      const musicAPIData = await getMusicList(Number(playlistId));
      setUsername(member.data.username);
      setPlaylists(playlist.data);

      setMusicList(musicAPIData);
    },
    [playlistId]
  );
  useEffect(() => {
    const fetchCompareId = async () => {
      if (userId) {
        const compareMember = await getMember(userId);
        setCompareId(compareMember.data.id);
      }
    };

    fetchCompareId();
  }, [userId]);
  useEffect(() => {
    if (id !== undefined) {
      fetchPlaylist(id);
    }
  }, [fetchPlaylist, id, musicList]);

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
          compareId={compareId}
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
