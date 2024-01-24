import file from "@assets/SetProfile/file.svg";
import ImageCropper from "@utils/ImageCrop/ImageCropper";
import { SetProfileImageDTO } from "types/SetProfile/setProfile";

const SetProfileImage = ({ aspectRatio, onCrop, compressedImage, isCompressLoading }: SetProfileImageDTO ) => {
  return (

    <ImageCropper aspectRatio={aspectRatio} onCrop={onCrop}>

      <div
        style={{ background: '#EDEDED' }}
        className="w-[170px] h-[170px]  relative top-72 rounded-full flex items-center justify-center"
      >

        {compressedImage ? <img
          src={compressedImage}
          alt="User Profile"
          className="w-full h-full object-cover object-center rounded-full"
        /> : <img src={file} alt="x" />
        }
 
      </div>
      </ImageCropper>
  );
}

export default SetProfileImage;