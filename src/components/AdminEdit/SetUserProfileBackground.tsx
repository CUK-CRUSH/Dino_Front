import { SetUserProfileBackgroundDTO } from "types/AdminEdit";

import camera from "../../assets/Admin/camera.svg";

const SetUserProfileBackground = ({userProfileBackgroundImage , handleUserProfileBackgroundImage} : SetUserProfileBackgroundDTO) => {
    return(
        <label
          htmlFor="backgroundImageInput"
          className="h-52  relative cursor-pointer"
        >
          <div
            className="h-52 w-full flex justify-center items-center bg-black bg-opacity-70 mb-[-35px] "
          >
            {userProfileBackgroundImage ? (
              <img
                src={userProfileBackgroundImage}
                alt="Selected"
                className="h-52 w-full object-cover"
              />
            ) : (
              <div className="absolute bottom-2 right-2">
                <img src={camera} alt='x' />
              </div>
            )}
          </div>
          <input
            type="file"
            id="backgroundImageInput"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleUserProfileBackgroundImage}
          />
        </label>
    )
}

export default SetUserProfileBackground