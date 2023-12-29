import { UserBackgroundImageDTO } from "types/Admin"

const UserBackground = ({userBackgroundImage} : UserBackgroundImageDTO) => {
    
    return(
        
        <div
          className="h-1/4 bg-white"
        >
          {userBackgroundImage ? (
            <img
              src={userBackgroundImage}
              alt="Selected"
              className="h-full w-full flex justify-center items-center"
            />
          ) : (
            <>
            </>
          )}
        </div>
    )
}

export default UserBackground