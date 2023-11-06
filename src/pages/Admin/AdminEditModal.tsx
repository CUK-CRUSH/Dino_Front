import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectImage } from "@reducer/imageSlice";
import { updateProfile, setUserProfileImage } from "@reducer/userProfileSlice";
import { RootState } from "@store/index";

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

  // const handleBackgroundImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const imageUrl = URL.createObjectURL(file);
  //     dispatch(selectImage(imageUrl));
  //   }
  // };

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


  // Rest of your component code remains the same

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      {/* The following div creates a semi-transparent overlay background */}
      <div className="absolute inset-0 bg-gray-800 opacity-75"></div>

      <div className="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        {/* Modal content */}
        <div className="mb-4">
          {/* Close button */}
          <button onClick={handleCancelClick} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {/* Rest of your modal content */}
        <div className="mb-4">
          <label htmlFor="newUserProfileImageInput" className="cursor-pointer text-blue-500">
            Change Profile Image
          </label>
          <input
            type="file"
            id="newUserProfileImageInput"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleNewUserProfileImageChange}
          />
          <div className="mb-0 flex items-center flex-col">
            <img
              src={newUserProfileImage || userProfileImage || "default-image-url.jpg"} // Set the image source from Redux state
              alt="User Profile"
              className="w-16 h-16 rounded-full overflow-hidden mb-2 bg-gradient-to-tr from-blue-500 via-green-500 to-yellow-500"
            />
          </div>
        </div>

        <div className="mb-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border bg-white"
          />
        </div>

        <div className="mb-4">
          <textarea
            value={introText}
            onChange={(e) => setIntroText(e.target.value)}
            className="w-full p-2 border bg-white"
          />
        </div>

        <div className="flex justify-end">
          <button onClick={handleSaveClick} className="bg-blue-500 text-white px-4 py-2">
            Save
          </button>
          <button onClick={handleCancelClick} className="ml-2 px-4 py-2">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminEditModal;