import { RootState } from "@store/index";
import { useSelector } from "react-redux";
import { UserBackgroundImageDTO } from "types/Admin"
import { Img } from "react-image";
import setDefaultBackgroundImage from "@assets/Admin/setDefaultBackgroundImage.svg";

const UserProfileBackground = ({ userBackgroundImage }: UserBackgroundImageDTO) => {
  const { profileBackgroundImage } = useSelector(
    (state: RootState) => state.userProfile
  );
  return (

    <div className="">
      {profileBackgroundImage ? (
        <Img
          src={profileBackgroundImage} 
          alt="Selected"
          className="h-[250px] w-full object-cover"
        />) : 
        userBackgroundImage ? (
          <Img
            src={userBackgroundImage}
            alt="Selected"
            className="h-[250px] w-full object-cover"
          />
        ) : <Img
        src={setDefaultBackgroundImage}
        alt="Selected"
        className="h-[250px] w-full object-cover"
      />}
    </div>
  );
};

export default UserProfileBackground;