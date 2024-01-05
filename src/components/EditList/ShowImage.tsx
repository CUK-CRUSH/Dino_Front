import React from "react";
import ImageCropper from "@utils/ImageCrop/ImageCropper";
import LoadingPage from "@utils/loading";
import { ShowImageDTO } from "types/EditplayList";
import { AiOutlinePicture } from "react-icons/ai";

const ShowImage: React.FC<ShowImageDTO> = ({
  aspectRatio,
  onCrop,
  compressedImage,
  isCompressLoading,
}) => {
  return (
    <div className="h-1/3 smartPhone:h-[28%] tablet:h-[25%] relative rounded-b-3xl bg-white cursor-pointer">
      <ImageCropper aspectRatio={aspectRatio} onCrop={onCrop}>
        {compressedImage ? (
          <>
            <img
              className="h-full w-full rounded-b-3xl object-cover"
              src={compressedImage}
              alt="Img"
            />
            <div className="text-[30px] text-shadow-sm shadow-black bottom-4 left-4 font-bold leading-5 absolute">
              <h2>Title</h2>
            </div>
          </>
        ) : (
          <div className="h-full flex items-center justify-center rounded-b-3xl text-center bg-white cursor-pointer">
            {isCompressLoading ? (
              <LoadingPage />
            ) : (
              <div>
                <div className="flex flex-col justify-center items-center h-full">
                  <AiOutlinePicture size={29} className="text-gray-400" />
                  <span className="text-center  text-[#8E8E8E] text-[15px] pt-[6px]">
                    Setting a representative image
                  </span>
                </div>
                <h2 className="text-[30px] text-shadow-sm shadow-black bottom-4 left-4 font-bold leading-5 absolute  ">
                  Title
                </h2>
              </div>
            )}
          </div>
        )}
      </ImageCropper>
    </div>
  );
};

export default ShowImage;
