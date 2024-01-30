import React, { useEffect, useState } from "react";

import { SetUserProfileBackgroundDTO } from "types/AdminEdit";

import ImageCropper from "@utils/ImageCrop/ImageCropper";
import LoadingPage from "@utils/loading";
import camera from "../../assets/Admin/camera.svg";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";

const SetUserProfileBackground = ({ aspectRatio, onCrop, isCompressLoading, earlyImage }: SetUserProfileBackgroundDTO) => {
  // early 이미지는 맨처음에 받아오는 이미지 
  // compressed는 수정한 후 이미지

  const { profileBackgroundImage } = useSelector(
    (state: RootState) => state.userProfile
  )

  const [isChange, setChange] = useState<boolean>(false);
  useEffect(() => {
    if (profileBackgroundImage) { setChange(true) }

  }, [profileBackgroundImage])
  return (
    <ImageCropper aspectRatio={aspectRatio} onCrop={onCrop}>

      <div className="h-52 bg-black bg-opacity-70 mb-[-35px] relative">
        {!isChange && earlyImage ? (    // If earlyImage is available
          <div className="relative">
            <img
              className="h-52 w-full object-cover"
              src={earlyImage}
              alt="Img"
            />
          </div>
        ) : profileBackgroundImage ? (
          // If compressedImage is available
          <div className="relative">
            <img
              className="h-52 w-full object-cover"
              src={profileBackgroundImage}
              alt="Img"
            />
          </div>
        ) : (
          // If neither earlyImage nor compressedImage is available
          <div className="h-full flex items-center justify-center text-center cursor-pointer">
            {isCompressLoading ? (
              <LoadingPage />
            ) : (
              <img className="absolute bottom-2 right-2" src={camera} alt="x" />
            )}
          </div>
        )}
      </div>
    </ImageCropper>

  )
}

export default SetUserProfileBackground