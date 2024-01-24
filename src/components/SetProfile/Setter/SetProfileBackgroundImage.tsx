import file from "@assets/SetProfile/file.svg";
import ImageCropper from "@utils/ImageCrop/ImageCropper";
import { SetUserProfileImageDTO } from "types/AdminEdit";

const SetProfileBackgroundImage = ({ aspectRatio, onCrop, compressedImage, isCompressLoading }: SetUserProfileImageDTO) => {
  return (

    <ImageCropper aspectRatio={aspectRatio} onCrop={onCrop}>

      <div
        style={{ background: '#EDEDED' }}
        className="overflow-hidden w-[500px] h-[170px]  relative top-72 flex items-center justify-center"
      >

        {compressedImage ? <img
          src={compressedImage}
          alt="User Profile"
          className="w-full h-full object-cover object-center"
        /> : <img src={file} alt="x" />
        }
 
      </div>
      </ImageCropper>
  );
}

export default SetProfileBackgroundImage;