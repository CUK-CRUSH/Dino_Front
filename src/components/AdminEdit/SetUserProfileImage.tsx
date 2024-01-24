import { SetUserProfileImageDTO } from "types/AdminEdit";

import camera from "@assets/Admin/camera.svg";
import ImageCropper from "@utils/ImageCrop/ImageCropper";
import LoadingPage from "@utils/loading";
import { useEffect, useState } from "react";
const SetUserProfileImage = ({ aspectRatio, onCrop, compressedImage, isCompressLoading, earlyImage }: SetUserProfileImageDTO) => {

  // early 이미지는 맨처음에 받아오는 이미지 
  // compressed는 수정한 후 이미지
  const [isChange, setChange] = useState<boolean>(false);
  useEffect(() => {
    if (compressedImage) { setChange(true) }

  }, [compressedImage])

  return (
    <ImageCropper aspectRatio={aspectRatio} onCrop={onCrop}>
      <div className="block w-16 h-16 rounded-full overflow-hidden mx-auto mb-2 relative cursor-pointer">
        {!isChange && earlyImage? (
          // When there is an earlyImage
          <img
            src={earlyImage}
            alt="User Profile"
            className="w-full h-full object-cover object-center"
          />
        ) : compressedImage ? (
          // When there is a compressedImage
          <img
            src={compressedImage}
            alt="User Profile"
            className="w-full h-full object-cover object-center"
          />
        ) : isCompressLoading ? (
          // When isCompressLoading is true
          <LoadingPage />
        ) : (
          // When there is no earlyImage or compressedImage, and isCompressLoading is false
          <>
            <div className="absolute inset-0 bg-black bg-opacity-70" />
            <img
              src={"../default-image-url.jpg"}  // Update this to the correct default image URL
              alt="User Profile"
              className="w-full h-full object-cover object-center"
            />
            <img
              src={camera}
              alt="Overlay"
              className="absolute top-0 left-[20px] w-[25px] h-full opacity-50"
            />
          </>
        )}
      </div>

    </ImageCropper>
  )
}

export default SetUserProfileImage