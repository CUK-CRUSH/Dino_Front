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
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const { isLoading: isCompressLoading, compressImage } = useImageCompress();

  const handleUploadImage = (image: string) => setUploadImage(image);
  const handleCompressImage = useCallback(async () => {
    if (!uploadImage) return;

    const imageFile = dataURItoFile(uploadImage);

    const compressedImage = await compressImage(imageFile);

    if (!compressedImage) return;
    const imageUrl = URL.createObjectURL(compressedImage);
    setCompressedImage(imageUrl);
  }, [uploadImage, compressImage]);

  const { handleEditClick, handleSaveClick, handleCancelClick } =
    UsePlayListEditor();

  // 쿠키에서 유저 id 가져오기
  const [cookies] = useCookies(["accessToken"]);
  const token = cookies.accessToken;
  const decodedToken = useDecodedJWT(token);
  const id = decodedToken.sub;
  //

  const [playlists, setPlaylists] = useState<any[]>([]);

  useEffect(() => {
    if (uploadImage) {
      handleCompressImage();
    }
    const fetchPlaylist = async (id: number) => {
      const member = await getMember(id);
      const playlist = await getPlayList(member.data.username);
      setPlaylists(playlist.data);
    };
    if (id !== undefined) {
      fetchPlaylist(id);
    }
  }, [uploadImage, handleCompressImage, id]);

  return (
    <div className="h-full w-full flex flex-col bg-black text-white font-medium leading-[18px]">
      {!isEditing && <MainEditButton />}

      {isEditing && (
        <EditPlaylistControls
          isEditing={isEditing}
          onSave={() => handleSaveClick(compressedImage)}
          onCancel={handleCancelClick}
          onEdit={handleEditClick}
        />
      )}

      <ShowImage
        aspectRatio={1}
        onCrop={handleUploadImage}
        compressedImage={compressedImage}
        isCompressLoading={isCompressLoading}
        isEditing={isEditing}
      />

      <MusicTitle playlists={playlists} />

      <MusicDataRow musicData={musicData} isEditing={isEditing} />

      {isEditing && <PlusButton />}
    </div>
  );
};

export default PlayList;
