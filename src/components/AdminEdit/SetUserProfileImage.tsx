import { SetUserProfileImageDTO } from "types/AdminEdit";

import camera from "@assets/Admin/camera.svg";
import garbage from "@assets/Admin/garbage.svg";
import setDefaultImage from "@assets/Admin/setDefaultImage.svg";
import ImageCropper from "@utils/ImageCrop/ImageCropper";
import LoadingPage from "@utils/loading";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";
const SetUserProfileImage = ({ aspectRatio, onCrop,  isCompressLoading, earlyImage }: SetUserProfileImageDTO) => {

  // early 이미지는 맨처음에 받아오는 이미지 
  // compressed는 수정한 후 이미지

  const { profileImage } = useSelector(
    (state: RootState) => state.userProfile
  )
  
  const [isChange, setChange] = useState<boolean>(false);
  useEffect(() => {
    if (profileImage) { setChange(true) }

  }, [profileImage])

  return (
    <ImageCropper aspectRatio={aspectRatio} onCrop={onCrop}>
      <div className="block w-16 h-16 mx-auto mb-2 relative cursor-pointer">
        {!isChange && earlyImage? (
          // When there is an earlyImage
          <div className="relative w-full h-full">
            <img
              src={earlyImage}
              alt="User Profile"
              className="w-full h-full object-cover object-center rounded-full"
            />
            <div className="absolute -right-2 bottom-0 ">
              <img
                src={garbage}
                alt="Overlay"
                className="w-[25px] h-full "
              />
            </div>
          </div>
        ) : profileImage ? (
          <div className="relative w-full h-full">
            <img
              src={profileImage}
              alt="Background Profile"
              className="w-full h-full object-cover object-center rounded-full"
            />
            <div className="absolute -right-2 bottom-0 ">
              <img
                src={garbage}
                alt="Overlay"
                className="w-[25px] h-full"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('a');
                }}              
                />
            </div>
          </div>
        ) : isCompressLoading ? (
          <LoadingPage />
        ) : (
          <>
            <div className="absolute inset-0 bg-black bg-opacity-10 rounded-full" />
            <img
              src={setDefaultImage}  // Update this to the correct default image URL
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