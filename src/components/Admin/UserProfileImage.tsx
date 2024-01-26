import { RootState } from "@store/index";
import { useSelector } from "react-redux";
import { UserProfileImageDTO } from "types/Admin";

const UserProfileImage = ({ userProfileImage }: UserProfileImageDTO) => {
  const { profileImage } = useSelector(
    (state: RootState) => state.userProfile
  );

  return (
    <div className="w-[75px] h-[75px] mt-[-35px] rounded-full overflow-hidden">
      {profileImage ? (
        <img src={profileImage} alt="User Profile" className="w-full object-cover" />
      ) : (
        <img
          src={userProfileImage || '../default-image-url.jpg'} // Provide the correct default image URL
          alt="Default User Profile"
          className="w-full object-cover"
        />
      )}
    </div>
  );
};

export default UserProfileImage;
