import file from "@assets/SetProfile/file.svg";
import { RootState } from "@store/index";
import ImageCropper from "@utils/ImageCrop/ImageCropper";
import { useSelector } from "react-redux";
import { SetProfileImageDTO } from "types/SetProfile/setProfile";
import { Img } from "react-image";

const SetProfileBackgroundImage = ({ aspectRatio, onCrop, isCompressLoading }: SetProfileImageDTO) => {

  const { profileBackgroundImage } = useSelector(
    (state: RootState) => state.setProfile
  )
  return (

    <ImageCropper aspectRatio={aspectRatio} onCrop={onCrop}>

      <div
        style={{ background: '#EDEDED' }}
        className="overflow-hidden w-[500px] h-[170px]  relative top-72 flex items-center justify-center"
      >

        {profileBackgroundImage ? 
        <Img
          src={profileBackgroundImage}
          alt="User Profile"
          className="w-full h-full object-cover object-center"
        /> : <Img src={file} alt="x" />
        }
 
      </div>
      </ImageCropper>
  );
}

export default SetProfileBackgroundImage;