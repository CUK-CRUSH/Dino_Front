import { RootState } from "@store/index";
import { useSelector } from "react-redux";
import { UserBackgroundImageDTO } from "types/Admin"

const UserProfileBackground = ({ userBackgroundImage }: UserBackgroundImageDTO) => {
  const { profileBackgroundImage } = useSelector(
    (state: RootState) => state.userProfile
  );

  return (
    <div className="">
      {profileBackgroundImage ? (
        <img
          src={profileBackgroundImage} // Use profileBackgroundImage here
          alt="Selected"
          className="h-full w-full object-cover"
        />
      ) : userBackgroundImage ? (
        <img
          src={userBackgroundImage}
          alt="Selected"
          className="h-full w-full object-cover"
        />
      ) : null}
    </div>
  );
};

export default UserProfileBackground;