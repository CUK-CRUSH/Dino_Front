import React from "react";
import LoadingPage from "@utils/loading";
import { ShowImageDTO } from "types/EditplayList";
import { AiOutlinePicture } from "react-icons/ai";
import ImageCropper from "@utils/ImageCrop/ImageCropper";

const ShowImage: React.FC<ShowImageDTO> = ({
  compressedImage,
  isCompressLoading,
  openEditModal,
}) => {
  return (
    <div
      onClick={openEditModal}
      className="h-1/3 relative rounded-b-3xl bg-white cursor-pointer"
    >
      {compressedImage ? (
        <img
          className="h-full w-full rounded-b-3xl object-cover"
          src={compressedImage}
          alt="Img"
        />
      ) : (
        <div className="h-full flex items-center justify-center rounded-b-3xl text-center bg-white cursor-pointer">
          {isCompressLoading ? (
            <>
              <LoadingPage />
              <div className="text-[30px] bottom-4 left-4 text-white shadow-black font-bold leading-5 absolute">
                <h2>Title</h2>
              </div>
            </>
          ) : (
            <div>
              <div className="flex flex-col justify-center items-center h-full">
                <AiOutlinePicture size={29} className="text-gray-400" />
                <span className="text-center text-[#8E8E8E] text-[15px] pt-[6px]">
                  Setting a representative image
                </span>
              </div>
              <div className="text-[30px] bottom-4 left-4 text-white shadow-black font-bold leading-5 absolute">
                <h2>Title</h2>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ShowImage;
