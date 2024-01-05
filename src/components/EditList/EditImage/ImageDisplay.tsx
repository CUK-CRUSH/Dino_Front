import React from "react";
import LoadingPage from "@utils/loading";
import { AiOutlinePicture } from "react-icons/ai";
import { ImageDisplayDTO } from "types/EditplayList";

const ImageDisplay: React.FC<ImageDisplayDTO> = ({
  compressedImage,
  isCompressLoading,
}) => {
  return (
    <>
      {compressedImage ? (
        <>
          <img
            className="h-full w-full rounded-b-3xl object-cover"
            src={compressedImage}
            alt="Img"
          />
          <div className="text-[32px] text-shadow-sm shadow-black bottom-4 left-4 font-bold leading-5 absolute">
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
                <span className="text-center  text-[#8E8E8E] text-[17px] pt-[6px]">
                  Setting a representative image
                </span>
              </div>
              <h2 className="text-[32px] text-shadow-sm shadow-black bottom-4 left-4 font-bold leading-5 absolute  ">
                Title
              </h2>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ImageDisplay;
