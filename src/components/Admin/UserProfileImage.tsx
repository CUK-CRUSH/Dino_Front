import { RootState } from "@store/index";
import { useSelector } from "react-redux";
import { UserProfileImageDTO } from "types/Admin";
import defaultImage from "@assets/Admin/defaultImage.svg";

const UserProfileImage = ({ userProfileImage }: UserProfileImageDTO) => {
  const { profileImage, deleteProfileImage } = useSelector(
    (state: RootState) => state.userProfile
  );

  return (
    <div className="w-[75px] h-[75px] mt-[-35px] rounded-full overflow-hidden">
      {profileImage ? (
        <img src={profileImage} alt="User Profile" className="w-full object-cover" />
      ) : deleteProfileImage ? (
        <img
          src={defaultImage}
          alt="Default User Profile"
          className="w-full object-cover"
        />
      ) : userProfileImage ? (
        <img
          src={userProfileImage}
          alt="Default User Profile"
          className="w-full object-cover"
        />
      ) : <img
        src={defaultImage}
        alt="Default User Profile"
        className="w-full object-cover"
      />}
    </div>
  );
};

export default UserProfileImage;