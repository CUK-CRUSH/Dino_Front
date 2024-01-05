import React from "react";
import ImageCropper from "@utils/ImageCrop/ImageCropper";
import { ShowImageDTO } from "types/EditplayList";
import ImageDisplay from "@components/EditList/EditImage/ImageDisplay";

const ShowImage: React.FC<ShowImageDTO> = ({
  aspectRatio,
  onCrop,
  compressedImage,
  isCompressLoading,
  isEditing,
}) => {
  return (
    <div className="h-1/3 smartPhone:h-[28%] tablet:h-[25%] relative rounded-b-3xl bg-white ">
      {isEditing ? (
        <ImageCropper aspectRatio={aspectRatio} onCrop={onCrop}>
          <ImageDisplay
            compressedImage={compressedImage}
            isCompressLoading={isCompressLoading}
          />
        </ImageCropper>
      ) : (
        <ImageDisplay
          compressedImage={compressedImage}
          isCompressLoading={isCompressLoading}
        />
      )}
    </div>
  );
};

export default ShowImage;
