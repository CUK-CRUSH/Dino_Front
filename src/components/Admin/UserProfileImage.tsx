import { UserProfileImageDTO } from "types/Admin";
import defaultImage from "@assets/Admin/defaultImage.svg";
import { Img } from "react-image";
import { Loader } from "@components/Loader/Loader";

const UserProfileImage = ({ userProfileImage }: UserProfileImageDTO) => {

  const src = userProfileImage || defaultImage;
  
  return (
    <div className="w-[75px] h-[75px] rounded-full overflow-hidden mx-auto -mt-[40px]">
      <Img
        src={src}
        alt="Default User Profile"
        className="w-full object-cover"
        loader={<Loader />}
      />
    </div>
  );
};

export default UserProfileImage;