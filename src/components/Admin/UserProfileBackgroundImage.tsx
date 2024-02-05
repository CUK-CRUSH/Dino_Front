import { RootState } from "@store/index";
import { useSelector } from "react-redux";
import { UserBackgroundImageDTO } from "types/Admin"
import { Img } from "react-image";

const UserProfileBackground = ({ userBackgroundImage }: UserBackgroundImageDTO) => {
  const { profileBackgroundImage } = useSelector(
    (state: RootState) => state.userProfile
  );
  return (

    <div className="">
      {profileBackgroundImage ? (
        <Img
          src={profileBackgroundImage} // Use profileBackgroundImage here
          alt="Selected"
          className="h-full w-full object-cover"
        />) : 
        userBackgroundImage ? (
          <Img
            src={userBackgroundImage}
            alt="Selected"
            className="h-full w-full object-cover"
          />
        ) : <div className="w-full h-[300px] bg-white"/>}
    </div>
  );
};

export default UserProfileBackground;