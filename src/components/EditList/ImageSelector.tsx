import React from "react";
import { AiOutlinePicture } from "react-icons/ai";
import { ImageSelectorDTO } from "types/EditplayList";

export const ImageSelector: React.FC<ImageSelectorDTO> = ({
  selectedImage,
  onImageChange,
}) => {
  return (
    <div
      className="h-1/3 rounded-b-3xl bg-white cursor-pointer"
      onClick={() => document.getElementById("imageInput")?.click()}
    >
      {selectedImage ? (
        <img
          src={selectedImage}
          alt="Selected"
          className="h-full w-full rounded-b-3xl object-cover"
        />
      ) : (
        <div className="flex flex-col justify-center items-center h-full">
          <AiOutlinePicture size={32} className="text-gray-400" />
          <span className="text-center text-neutral-400 text-[15px] font-medium leading-[18px] pt-[6px]">
            Setting a representative image
          </span>
        </div>
      )}
      <input
        type="file"
        id="imageInput"
        accept="image/*"
        style={{ display: "none" }}
        onChange={onImageChange}
      />
    </div>
  );
};
