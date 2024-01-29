import React from "react";
import LoadingPage from "@utils/loading";
import { AiOutlinePicture } from "react-icons/ai";
import { ImageDisplayDTO } from "types/EditplayList";
import { useTranslation } from "react-i18next";

const ImageDisplay: React.FC<ImageDisplayDTO> = ({
  imageURL,
  isCompressLoading,
  cursor,
}) => {
  const { t } = useTranslation("Edit");
  return (
    <>
      {imageURL ? (
        <img
          className="h-full w-full rounded-b-3xl object-cover"
          src={imageURL}
          alt="Img"
        />
      ) : (
        <div
          className={`h-full flex items-center justify-center rounded-b-3xl text-center bg-white cursor-${cursor}`}
        >
          {isCompressLoading ? (
            <LoadingPage />
          ) : (
            <div>
              <div className="flex flex-col justify-center items-center h-full">
                <AiOutlinePicture size={29} className="text-[#8E8E8E]" />
                <span className="text-center  text-[#8E8E8E] text-[17px] pt-[6px]">
                  {t("representive_image")}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ImageDisplay;
