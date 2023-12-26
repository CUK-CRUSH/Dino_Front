import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectImage } from "@reducer/imageSlice";
import { updateProfile, setUserProfileImage } from "@reducer/userProfileSlice"; // Import setUserProfileImage action
import { RootState } from "@store/index";

interface AdminEditPageProps {}

// 보류
const AdminEditPage: React.FC<AdminEditPageProps> = () => {
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
  };

  const handleCancelClick = () => {
    // Revert changes, if any
    setUsername("Your Username");
    setIntroText("Welcome to the Admin Page");
    setNewUserProfileImage(null);
  };

  const handleBackgroundImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      dispatch(selectImage(imageUrl));
    }
  };

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

  return (
    <div className="h-screen flex flex-col bg-white">
      <div
        className="h-1/4 bg-blue-500 relative"
        onClick={() => document.getElementById("backgroundImageInput")?.click()}
      >
        {selectedBackgroundImage ? (
          <img
            src={selectedBackgroundImage}
            alt="Selected"
            className="h-full w-full object-cover"
          />
        ) : (
          <p className="text-black text-center p-4">Click to upload a background image</p>
        )}
      </div>
      <input
        type="file"
        id="backgroundImageInput"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleBackgroundImageChange}
      />

      <div className="p-4">
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
              src={newUserProfileImage || userProfileImage || "placeholder-image-url.jpg"}
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

export default AdminEditPage;
