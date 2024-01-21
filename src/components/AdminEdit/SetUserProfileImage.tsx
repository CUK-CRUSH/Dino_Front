import { SetUserProfileImageDTO } from "types/AdminEdit";

import camera from "../../assets/Admin/camera.svg";
import ImageCropper from "@utils/ImageCrop/ImageCropper";
import LoadingPage from "@utils/loading";
const SetUserProfileImage = ({ aspectRatio, onCrop, compressedImage, isCompressLoading }: SetUserProfileImageDTO) => {
  return (
    <ImageCropper aspectRatio={aspectRatio} onCrop={onCrop}>
      <div className="block w-16 h-16 rounded-full overflow-hidden mx-auto mb-2 relative cursor-pointer">
        {compressedImage ?
          // 이미지가 있을때
          <>
            <img
              src={compressedImage}
              alt="User Profile"
              className="w-full h-full object-cover object-center"
            />
          </>
          :
          // 이미지가 없을때
          <>
            {isCompressLoading ? (
              <LoadingPage />
            ) : (
              <>
                <div className="absolute inset-0 bg-black bg-opacity-70" />
                <img
                  src={"../default-image-url.jpg"}
                  alt="User Profile"
                  className="w-full h-full object-cover object-center"
                />
                <img src={camera} alt="Overlay"
                  className="absolute top-0 left-[20px] w-[25px] h-full  opacity-50" />
              </>
            )}


          </>
        }

      </div>

    </ImageCropper>
  )
}

export default SetUserProfileImage