import React from "react";
import ImageCropper from "@utils/ImageCrop/ImageCropper";
import { ShowImageDTO } from "types/EditplayList";
import ImageDisplay from "@components/EditList/EditImage/ImageDisplay";

const ShowImage: React.FC<ShowImageDTO> = ({
  aspectRatio,
  onCrop,
  playlists,
  isCompressLoading,
  isEditing,
  playlistId,
}) => {
  const playlist = playlists.find(
    (playlist: any) => playlist?.id === Number(playlistId)
  );
  return (
    <div className="h-1/3 smartPhone:h-[28%] tabletMini:h-[20%] tablet:h-[18%] relative rounded-b-3xl bg-white ">
      {isEditing ? (
        <ImageCropper aspectRatio={aspectRatio} onCrop={onCrop}>
          <ImageDisplay
            imageURL={playlist?.thumbnailUrl}
            isCompressLoading={isCompressLoading}
            cursor="pointer"
          />
        </ImageCropper>
      ) : (
        <ImageDisplay
          imageURL={playlist?.thumbnailUrl}
          isCompressLoading={isCompressLoading}
          cursor="default"
        />
      )}
    </div>
  );
};

export default ShowImage;
