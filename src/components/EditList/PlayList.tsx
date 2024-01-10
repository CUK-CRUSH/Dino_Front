import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UsePlayListEditor } from "@hooks/UsePlayListEditor";
import { RootState } from "@store/index";
import { EditPlsyListDTO } from "types/EditplayList";
import { EditPlaylistControls } from "@components/EditList/Button/EditPlaylistControl";
import { MusicDataRow } from "@components/EditList/MusicList/MusicDataRow";
import useImageCompress from "@hooks/useImageCompress";
import { dataURItoFile } from "@utils/ImageCrop/common";
import { PlusButton } from "./Button/PlusButton";
import ShowImage from "@components/EditList/EditImage/ShowImage";
import { MainEditButton } from "@components/EditList/Button/MainEditButton";
import { MusicTitle } from "@components/EditList/MusicList/MusicTitle";

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

  useEffect(() => {
    if (uploadImage) {
      handleCompressImage();
    }
  }, [uploadImage, handleCompressImage]);

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
      <MusicTitle />

      <MusicDataRow musicData={musicData} isEditing={isEditing} />

      {isEditing && <PlusButton />}
    </div>
  );
};

export default PlayList;
