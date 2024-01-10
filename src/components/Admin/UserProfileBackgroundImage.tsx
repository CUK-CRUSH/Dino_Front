import { UserBackgroundImageDTO } from "types/Admin"

const UserProfileBackground = ({userBackgroundImage} : UserBackgroundImageDTO) => {
    
    return(
        
        <div
          className=""
        >
          {userBackgroundImage && (
            <img
              src={userBackgroundImage}
              alt="Selected"
              className="h-full w-full object-cover"
            />
          ) 
          }
        </div>
    )
}

export default UserProfileBackground