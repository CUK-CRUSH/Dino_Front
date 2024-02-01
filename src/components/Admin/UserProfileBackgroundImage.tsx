import { RootState } from "@store/index";
import { useSelector } from "react-redux";
import { UserBackgroundImageDTO } from "types/Admin"
import { Img } from "react-image";

const UserProfileBackground = ({ userBackgroundImage }: UserBackgroundImageDTO) => {
  const { profileBackgroundImage, deleteBackgroundImage } = useSelector(
    (state: RootState) => state.userProfile
  );

  console.log(profileBackgroundImage, userBackgroundImage)
  return (

    <div className="">
      {profileBackgroundImage ? (
        <Img
          src={profileBackgroundImage} // Use profileBackgroundImage here
          alt="Selected"
          className="h-full w-full object-cover"
        />) : deleteBackgroundImage ? (
          null
        ) : userBackgroundImage ? (
          <Img
            src={userBackgroundImage}
            alt="Selected"
            className="h-full w-full object-cover"
          />
        ) : null}
    </div>
  );
};

export default UserProfileBackground;