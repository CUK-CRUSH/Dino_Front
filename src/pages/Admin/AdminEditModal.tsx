import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectImage } from "@reducer/imageSlice";
import { updateProfile, setUserProfileImage } from "@reducer/userProfileSlice";
import { RootState } from "@store/index";
import camera from "../../assets/Admin/camera.svg";
import edit from "../../assets/Admin/editButton.svg";
import useWindowSizeCustom from "@hooks/useWindowSizeCustom";


interface AdminEditModalProps {
  onClose: () => void; // A function to close the modal
}

const AdminEditModal: React.FC<AdminEditModalProps> = ({ onClose }) => {
  const selectedBackgroundImage = useSelector((state: RootState) => state.image.selectedImage);
  const userProfileImage = useSelector((state: RootState) => state.image.userProfileImage);
  const dispatch = useDispatch();

  const [newUserProfileImage, setNewUserProfileImage] = useState<string | null>(null);
  const [username, setUsername] = useState("Your Username");
  const [introText, setIntroText] = useState("Welcome to the Admin Page");

  const handleSaveClick = () => {
    // Save changes to Redux store
    dispatch(updateProfile({ username, introText }));
    if (newUserProfileImage) {
      dispatch(setUserProfileImage(newUserProfileImage));
    }
    if (selectedBackgroundImage) {
      dispatch(selectImage(selectedBackgroundImage));
    }
    onClose(); // Close the modal
  };

  const handleCancelClick = () => {
    onClose(); // Close the modal without saving changes
  };

  // 배경화면
  const handleBackgroundImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      dispatch(selectImage(imageUrl));
    }
  };

  // 프로필사진
  const handleNewUserProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        setNewUserProfileImage(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const windowSize = useWindowSizeCustom();
  // 사이즈 390 보다 크면 모달창 크기 고정
  const [size, setSize] = useState<boolean>(false);

  useEffect(() => {
    if (windowSize.width > 390) {
      setSize(true);
    }
    else {
      setSize(false);
    }

  }, [windowSize.width])

  const selectedImage = useSelector((state: RootState) => state.image.selectedImage);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Save the selected image to Redux store
      dispatch(selectImage(URL.createObjectURL(file)));
    }
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      {/* The following div creates a semi-transparent overlay background */}
      <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
      <div className={`relative ${size ? "w-[390px]" : "w-full"} h-full mt-5 bg-white rounded-t-3xl shadow-lg`}>
        {/* Modal content */}
        <div className="mb-4">
          {/* Close button */}
          <button onClick={handleCancelClick} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
            Save
          </button>
        </div>

        {/* Rest of your modal content */}
        <div className="mb-4">
          <button onClick={handleCancelClick} className="text-red-600	 hover:text-gray-800">
            Cancel
          </button>
        </div>

        {/* 배경화면 */}
        <label
          htmlFor="backgroundImageInput"
          className="h-52  relative cursor-pointer"
        >
          <div
            className="h-52 w-full flex justify-center items-center bg-black bg-opacity-70 mb-[-35px] "
          >
            {selectedImage ? (
              <img
                src={selectedImage}
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
            onChange={handleBackgroundImageChange}
          />
        </label>

        {/* 프로필 사진 */}
        <label htmlFor="newUserProfileImageInput" className="block w-16 h-16 rounded-full overflow-hidden mx-auto mb-2 bg-gradient-to-tr from-blue-500 via-green-500 to-yellow-500 relative cursor-pointer">
          <div className="absolute inset-0 bg-black bg-opacity-70"></div>
          <img
            src={newUserProfileImage || userProfileImage || "default-image-url.jpg"}
            alt="User Profile"
            className="w-full h-full object-cover object-center"
          />
          <img src={camera} alt="Overlay"
            className="absolute top-0 left-[20px] w-[25px] h-full  opacity-50" />

          <input
            type="file"
            id="newUserProfileImageInput"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleNewUserProfileImageChange}
            className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
          />
        </label>

        {/* 유저 닉네임 */}
        <div className="ml-4 mb-2 text-sm">
          User Name
        </div>

        <div className="mb-4 flex flex-col items-center relative">
          <input
            type="text"
            value={username}
            placeholder="User Name"
            onChange={(e) => setUsername(e.target.value)}
            className="w-11/12 p-2 border-b border-black focus:outline-none bg-white"
          />
          <div className="absolute right-4 top-3">
            <img src={edit} alt="Edit" className="w-4 h-4 cursor-pointer" />
          </div>
        </div>

        {/* 한줄소개 */}

        <div className="ml-4 mb-2 text-sm">
          Comment
        </div>

        <div className="mb-4 flex flex-col items-center relative">
          <input
            value={introText}
            placeholder="Comment"
            onChange={(e) => setIntroText(e.target.value)}
            className="w-11/12 p-2 border-b border-black focus:outline-none bg-white"
          />
          <div className="absolute right-4 top-3">
            <img src={edit} alt="Edit" className="w-4 h-4 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>

  );
};

export default AdminEditModal;