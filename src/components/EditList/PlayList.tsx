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
      setUsername(member.data.username);
      setPlaylists(playlist.data);
    };
    if (id !== undefined) {
      fetchPlaylist(id);
    }
  }, [uploadImage, handleCompressImage, id]);
  // console.log(musicData.title);

  return (
    <div className="h-full w-full flex flex-col bg-black text-white font-medium leading-[18px]">
      {!isEditing && (
        <MainEditButton
          playlists={playlists}
          uploadImage={uploadImage}
          token={token}
          playlistName={playlistName}
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

      <MusicDataRow musicData={musicData} isEditing={isEditing} />

      {isEditing && <PlusButton playlists={playlists} username={username} />}
    </div>
  );
};

export default PlayList;
