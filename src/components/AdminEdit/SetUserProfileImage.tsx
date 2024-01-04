import { SetUserProfileImageDTO } from "types/AdminEdit";

import camera from "../../assets/Admin/camera.svg";
import ImageCropper from "@utils/ImageCrop/ImageCropper";
const SetUserProfileImage = ({aspectRatio,onCrop,compressedImage,isCompressLoading} : SetUserProfileImageDTO) => {
    return(
      <ImageCropper aspectRatio={aspectRatio} onCrop={onCrop}>
      <label htmlFor="UserProfileImageInput" className="block w-16 h-16 rounded-full overflow-hidden mx-auto mb-2 bg-gradient-to-tr from-blue-500 via-green-500 to-yellow-500 relative cursor-pointer">
      <div className="absolute inset-0 bg-black bg-opacity-70" />
      <img
        src={compressedImage || "default-image-url.jpg"}
        alt="User Profile"
        className="w-full h-full object-cover object-center"
      />
      <img src={camera} alt="Overlay"
        className="absolute top-0 left-[20px] w-[25px] h-full  opacity-50" />

    </label>
    </ImageCropper>
    )
}

export default SetUserProfileImage