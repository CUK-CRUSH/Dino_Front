import React from "react";
import ImageCropper from "@utils/ImageCrop/ImageCropper";
import { ShowImageDTO } from "types/EditplayList";
import { AiOutlinePicture } from "react-icons/ai";
import { IoCameraOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";

const ShowImage: React.FC<ShowImageDTO> = ({
  aspectRatio,
  onCrop,
  playlists,
  isEditing,
  playlistId,
}) => {
  const { t } = useTranslation("Edit");
  const playlist = playlists.find(
    (playlist: any) => playlist?.id === Number(playlistId)
  );
  const { image: reduxImage } = useSelector(
    (state: RootState) => state.musicAdd
  );

  return (
    <div className="h-1/3 smartPhone:h-[28%] tabletMini:h-[20%] tablet:h-[18%] relative rounded-b-3xl bg-white ">
      {isEditing ? (
        <ImageCropper aspectRatio={aspectRatio} onCrop={onCrop}>
          <div className="h-full w-full rounded-b-3xl object-cover relative">
            {playlist?.thumbnailUrl ? (
              <>
                <img
                  className="h-full w-full object-cover rounded-b-3xl"
                  src={playlist?.thumbnailUrl}
                  alt="Img"
                />
                <IoCameraOutline color="black" />
              </>
            ) : (
              <div
                className={`h-full flex items-center justify-center rounded-b-3xl text-center bg-white cursor-pointer`}
              >
                {reduxImage ? (
                  <img
                    src={reduxImage}
                    alt="Img"
                    className="h-full w-full object-cover rounded-b-3xl"
                  />
                ) : (
                  <div>
                    <div className="flex flex-col justify-center items-center h-full">
                      <AiOutlinePicture size={29} className="text-[#8E8E8E]" />
                      <span className="text-center  text-[#8E8E8E] text-[17px] pt-[6px]">
                        {t("representive_image")}
                      </span>
                      <IoCameraOutline color="black" />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </ImageCropper>
      ) : playlist?.thumbnailUrl ? (
        <img
          className="h-full w-full rounded-b-3xl object-cover"
          src={playlist?.thumbnailUrl}
          alt="Img"
        />
      ) : (
        <div
          className={`h-full flex items-center justify-center rounded-b-3xl text-center bg-white cursor-pointer`}
        >
          {reduxImage ? (
            <img
              src={reduxImage}
              alt="Img"
              className="h-full w-full object-cover rounded-b-3xl"
            />
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
    </div>
  );
};

export default ShowImage;
