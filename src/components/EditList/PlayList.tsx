import React, { useEffect, useState } from "react";
import { AiFillPlusCircle, AiOutlinePicture } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { updateArtist, updateTitle, updateURL } from "@reducer/musicadd";
import { setIsEditing } from "@reducer/editPlayList/isEdit";
import { RootState } from "@store/index";
import { useNavigate } from "react-router-dom";
import { EditPlsyListDTO } from "types/EditplayList";
import { EditPlaylistControls } from "@components/EditList/EditPlaylistControl";
import { MusicDataRow } from "@components/EditList/MusicDataRow";
import useImageCompress from "@hooks/useImageCompress";
import { dataURItoFile } from "@utils/ImageCrop/common";
import ImageCropper from "@utils/ImageCrop/ImageCropper";
import LoadingPage from "@utils/loading";

const PlayList: React.FC<EditPlsyListDTO> = () => {
  const isEditing = useSelector(
    (state: RootState) => state.editPlaylistToggle.isEditing
  );
  const musicData = useSelector((state: RootState) => state.musicAdd);
  const [uploadImage, setUploadImage] = useState<string | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const { isLoading: isCompressLoading, compressImage } = useImageCompress();

  const handleUploadImage = (image: string) => setUploadImage(image);
  const handleCompressImage = async () => {
    if (!uploadImage) return;

    const imageFile = dataURItoFile(uploadImage);

    const compressedImage = await compressImage(imageFile);

    if (!compressedImage) return;
    const imageUrl = URL.createObjectURL(compressedImage);
    setCompressedImage(imageUrl);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleAddMusicClick = () => {
    navigate(`/admin/1/edit`);
  };

  useEffect(() => {
    if (uploadImage) {
      handleCompressImage();
    }
  }, [uploadImage]);

  return (
    <div className="z-30 h-full w-full flex flex-col bg-black text-white">
      <div className="h-1/3 rounded-b-3xl bg-white cursor-pointer">
        <ImageCropper aspectRatio={1 / 1} onCrop={handleUploadImage}>
          {compressedImage ? (
            <img
              className="h-full w-full rounded-b-3xl object-cover"
              src={compressedImage}
              alt="Img"
            />
          ) : (
            <div className="h-full flex items-center justify-center rounded-b-3xl text-center bg-white cursor-pointer">
              {isCompressLoading ? (
                <LoadingPage />
              ) : (
                <div className="flex flex-col justify-center items-center h-full">
                  <AiOutlinePicture size={32} className="text-gray-400" />
                  <span className="text-center text-neutral-400 text-[15px] font-medium leading-[18px] pt-[6px]">
                    Setting a representative image
                  </span>
                </div>
              )}
            </div>
          )}
        </ImageCropper>
      </div>

      <EditPlaylistControls
        isEditing={isEditing}
        onSave={handleSaveClick}
        onCancel={handleCancelClick}
        onEdit={handleEditClick}
      />

      <div className="h-2/3 overflow-auto">
        <div className="w-full my-10">
          <MusicDataRow musicData={musicData} />
        </div>
      </div>

      {isEditing && (
        <div className="absolute right-1 bottom-1">
          <button onClick={handleAddMusicClick}>
            <AiFillPlusCircle size={56} className="text-white" />
          </button>
        </div>
      )}
    </div>
  );
};

export default PlayList;
