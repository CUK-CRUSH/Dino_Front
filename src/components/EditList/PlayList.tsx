import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateArtist, updateTitle, updateURL } from "@reducer/musicadd";
import { setIsEditing } from "@reducer/editPlayList/isEdit";
import { RootState } from "@store/index";
import { EditPlsyListDTO } from "types/EditplayList";
import { EditPlaylistControls } from "@components/EditList/Button/EditPlaylistControl";
import { MusicDataRow } from "@components/EditList/MusicDataRow";
import useImageCompress from "@hooks/useImageCompress";
import { dataURItoFile } from "@utils/ImageCrop/common";
import { PlusButton } from "./Button/PlusButton";
import ShowImage from "@components/EditList/ShowImage";

const PlayList: React.FC<EditPlsyListDTO> = () => {
  const isEditing = useSelector(
    (state: RootState) => state.editPlaylistToggle.isEditing
  );
  const musicData = useSelector((state: RootState) => state.musicAdd);
  const [uploadImage, setUploadImage] = useState<string | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const { isLoading: isCompressLoading, compressImage } = useImageCompress();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleUploadImage = (image: string) => setUploadImage(image);
  const handleCompressImage = useCallback(async () => {
    if (!uploadImage) return;

    const imageFile = dataURItoFile(uploadImage);

    const compressedImage = await compressImage(imageFile);

    if (!compressedImage) return;
    const imageUrl = URL.createObjectURL(compressedImage);
    setCompressedImage(imageUrl);
  }, [uploadImage, compressImage]);

  const dispatch = useDispatch();

  const handleEditClick = () => {
    dispatch(setIsEditing(true));
  };

  const handleSaveClick = () => {
    dispatch(setIsEditing(false));
  };

  const handleCancelClick = () => {
    dispatch(updateTitle(""));
    dispatch(updateArtist(""));
    dispatch(updateURL(""));
    dispatch(setIsEditing(false));
  };

  useEffect(() => {
    if (uploadImage) {
      handleCompressImage();
    }
  }, [uploadImage, handleCompressImage]);

  return (
    <div className=" h-full w-full flex flex-col bg-black text-white font-medium leading-[18px]">
      <ShowImage
        aspectRatio={1 / 1}
        onCrop={handleUploadImage}
        compressedImage={compressedImage}
        isCompressLoading={isCompressLoading}
      />

      <EditPlaylistControls
        isEditing={isEditing}
        onSave={handleSaveClick}
        onCancel={handleCancelClick}
        onEdit={handleEditClick}
      />

      <MusicDataRow musicData={musicData} isEditing={isEditing} />

      {isEditing && <PlusButton />}
    </div>
  );
};

export default PlayList;
