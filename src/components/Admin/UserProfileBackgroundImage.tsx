import { UserBackgroundImageDTO } from "types/Admin"
import { Img } from "react-image";
import setDefaultBackgroundImage from "@assets/Admin/setDefaultBackgroundImage.svg";
import { Loader } from "@components/Loader/Loader";

const UserProfileBackground = ({ userBackgroundImage }: UserBackgroundImageDTO) => {
  
  const src = userBackgroundImage || setDefaultBackgroundImage;

  return (
    <div className="-mb-[40px] h-[250px] w-full">
      <Img
        src={src}
        alt="Selected"
        className="h-[250px] w-full object-cover"
        loader={<Loader />}  // 로딩 중에 보여줄 컴포넌트
      />
    </div>
  );
};

export default UserProfileBackground;