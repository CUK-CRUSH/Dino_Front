import { RootState } from "@store/index";
import { useSelector } from "react-redux";
import { UserBackgroundImageDTO } from "types/Admin"

const UserProfileBackground = ({userBackgroundImage} : UserBackgroundImageDTO) => {
  const { profileBackgroundImage } = useSelector(
    (state: RootState) => state.setProfile
  );  
    return(
        
        <div
          className=""
        >
          {userBackgroundImage && (
            <img
              src={userBackgroundImage || profileBackgroundImage}
              alt="Selected"
              className="h-full w-full object-cover"
            />
          ) 
          }
        </div>
    )
}

export default UserProfileBackground