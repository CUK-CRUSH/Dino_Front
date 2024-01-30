import file from "@assets/SetProfile/file.svg";
import ImageCropper from "@utils/ImageCrop/ImageCropper";
import { SetProfileImageDTO } from "types/SetProfile/setProfile";
import { RootState } from "@store/index";
import { useSelector } from "react-redux";

const SetProfileImage = ({ aspectRatio, onCrop, isCompressLoading }: SetProfileImageDTO ) => {

  const { profileImage } = useSelector(
    (state: RootState) => state.setProfile
  )
  return (

    <ImageCropper aspectRatio={aspectRatio} onCrop={onCrop}>

      <div
        style={{ background: '#EDEDED' }}
        className="w-[170px] h-[170px]  relative top-72 rounded-full flex items-center justify-center"
      >

        {profileImage ? <img
          src={profileImage}
          alt="User Profile"
          className="w-full h-full object-cover object-center rounded-full"
        /> : <img src={file} alt="x" />
        }
 
      </div>
      </ImageCropper>
  );
}

export default SetProfileImage;