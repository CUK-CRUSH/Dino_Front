import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UsePlayListEditor } from "@hooks/UsePlayListEditor";
import { RootState } from "@store/index";
import { EditPlsyListDTO } from "types/EditplayList";
import { EditPlaylistControls } from "@components/EditList/Button/EditPlaylistControl";
import { MusicDataRow } from "@components/EditList/MusicList/MusicDataRow";
import useImageCompress from "@hooks/useImageCompress";
import { dataURItoFile } from "@utils/ImageCrop/common";
import { PlusButton } from "@components/EditList/Button/PlusButton";
import ShowImage from "@components/EditList/EditImage/ShowImage";
import { MainEditButton } from "@components/EditList/Button/MainEditButton";
import { MusicTitle } from "@components/EditList/MusicList/MusicTitle";
import { useCookies } from "react-cookie";
import useDecodedJWT from "@hooks/useDecodedJWT";
import { getMember } from "@api/member-controller/memberController";
import { getPlayList } from "@api/playlist-controller/playlistControl";
import { getMusicList } from "@api/music-controller/musicControl";

const PlayList: React.FC<EditPlsyListDTO> = () => {
  const isEditing = useSelector(
    (state: RootState) => state.editPlaylistToggle.isEditing
  );
  const musicData = useSelector((state: RootState) => state.musicAdd);
  const [uploadImage, setUploadImage] = useState<string | null>(null);

  const { isLoading: isCompressLoading, compressImage } = useImageCompress();
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [username, setUsername] = useState<string | null>(null);
  const [playlistName, setPlaylistName] = useState("");
  const [musicList, setMusicList] = useState<any[]>([]);

  console.log(playlists);

  const handleUploadImage = (image: string) => setUploadImage(image);
  const handleCompressImage = useCallback(async () => {
    if (!uploadImage) return;

    const imageFile = dataURItoFile(uploadImage);

    const result = await compressImage(imageFile);

    if (!result) return;
  }, [uploadImage, compressImage]);
  // 쿠키에서 유저 id 가져오기
  const [cookies] = useCookies(["accessToken"]);
  const token = cookies.accessToken;
  const decodedToken = useDecodedJWT(token);
  const id = decodedToken.sub;
  //
  const { handleEditClick, handleSaveClick, handleCancelClick } =
    UsePlayListEditor(playlists, uploadImage, token, playlistName, musicData);

  useEffect(() => {
    if (uploadImage) {
      handleCompressImage();
    }
    const fetchPlaylist = async (id: number) => {
      const member = await getMember(id);
      const playlist = await getPlayList(member.data.username);
      const playlistId = playlist.data[0].id;

      const musicAPIData = await getMusicList(playlistId);
      setUsername(member.data.username);
      setPlaylists(playlist.data);
      setMusicList(musicAPIData);
    };
    if (id !== undefined) {
      fetchPlaylist(id);
    }
  }, [handleCompressImage, id, uploadImage, musicList]);
  // 일단 의존성때문에 넣을건데 musicList빼고 나중에 다 지워도 될ㄷ스.

  return (
    <div className="h-full w-full flex flex-col bg-black text-white font-medium leading-[18px]">
      {!isEditing && (
        <MainEditButton
          playlists={playlists}
          uploadImage={uploadImage}
          token={token}
          playlistName={playlistName}
          musicData={musicData}
        />
      )}

      {isEditing && (
        <EditPlaylistControls
          isEditing={isEditing}
          onSave={() => handleSaveClick(uploadImage)}
          onCancel={handleCancelClick}
          onEdit={handleEditClick}
        />
      )}

      <ShowImage
        aspectRatio={1}
        onCrop={handleUploadImage}
        playlists={playlists}
        isCompressLoading={isCompressLoading}
        isEditing={isEditing}
      />

      <MusicTitle
        playlists={playlists}
        titlechange={(newTitle) => {
          setPlaylistName(newTitle);
        }}
        isEditing={isEditing}
      />

      <MusicDataRow
        isEditing={isEditing}
        musicList={musicList}
        // fetchMoreData={fetchMoreData}
      />

      {isEditing && <PlusButton playlists={playlists} username={username} />}
    </div>
  );
};

export default PlayList;
