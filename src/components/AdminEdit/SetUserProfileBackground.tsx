import React from "react";

import { SetUserProfileBackgroundDTO } from "types/AdminEdit";

import ImageCropper from "@utils/ImageCrop/ImageCropper";
import LoadingPage from "@utils/loading";
import camera from "../../assets/Admin/camera.svg";

const SetUserProfileBackground = ({ aspectRatio, onCrop, compressedImage, isCompressLoading }: SetUserProfileBackgroundDTO) => {

  return (      <ImageCropper aspectRatio={aspectRatio} onCrop={onCrop}>

    <div className="h-52 bg-black bg-opacity-70 mb-[-35px] relative">
        {compressedImage ? (
          // 사진있으면
          <div className="relative">
            <img
              className="h-52 w-full object-cover"
              src={compressedImage}
              alt="Img"
            />

          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-center  cursor-pointer ">
            {isCompressLoading ? (
              <LoadingPage />
            ) : (
              <img className="absolute bottom-2 right-2" src={camera} alt='x' />

            )}
          </div>
        )}
    </div>
    </ImageCropper>

  )
}

export default SetUserProfileBackground