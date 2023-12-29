import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectImage } from "@reducer/imageSlice";
import { updateProfile, setUserProfileImage } from "@reducer/userProfileSlice";
import { RootState } from "@store/index";
import edit from "../../assets/Admin/editButton.svg";
import useWindowSizeCustom from "@hooks/useWindowSizeCustom";
import '../../styles/Admin/style.css';
import EditButton from "@components/AdminEdit/EditButton";
import SetUserProfileBackground from "@components/AdminEdit/SetUserProfileBackground";


interface AdminEditModalProps {
  onClose: () => void; // A function to close the modal
}

const AdminEditModal: React.FC<AdminEditModalProps> = ({ onClose }) => {
  
  
  const dispatch = useDispatch();

  const [username, setUsername] = useState("Your Username");
  const [introText, setIntroText] = useState("Welcome to the Admin Page");

  const userProfile = useSelector((state: RootState) => state.userProfile);

  const save = () => {
    // Save changes to Redux store
    dispatch(updateProfile({ username, introText }));
    if (userProfile.userProfileImage) {
      dispatch(setUserProfileImage(userProfile.userProfileImage));
    }
    if (userProfile.userBackgroundImage) {
      dispatch(selectImage(userProfile.userBackgroundImage));
    }
    onClose(); // Close the modal
  };

  const close = () => {
    onClose(); // Close the modal without saving changes
  };

  // 배경화면
  const handleUserProfileBackgroundImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      dispatch(selectImage(imageUrl));
    }
  };

  // 프로필사진
  const handleUserProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        setUserProfileImage(imageData);
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


  // 열고닫기
  const [isOpen, setIsOpen] = useState(true);

  const cancel = () => {
    console.log(isOpen)
    setIsOpen(!isOpen);
  
    setTimeout(() => {
      close();
    }, 900);
  };
  
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      {/* The following div creates a semi-transparent overlay background */}
      <div className="absolute inset-0 bg-gray-800 opacity-75 "></div>
      <div 
        className={`relative ${size ? "w-[390px]" : "w-full"} h-full mt-5 bg-white rounded-t-3xl shadow-lg
        animate-slide-${isOpen ? 'in' : 'out'}`}>
          
        {/* 상단 취소/저장 버튼 */}
        <div className="flex justify-between h-[50px]">
          <EditButton save={save} cancel={cancel} />
        </div>

        {/* 배경화면 */}
        <SetUserProfileBackground userBackgroundImage={userProfile.userBackgroundImage} handleUserProfileBackgroundImage={handleUserProfileBackgroundImage}/>

        {/* 프로필 사진 */}
        {/* <label htmlFor="UserProfileImageInput" className="block w-16 h-16 rounded-full overflow-hidden mx-auto mb-2 bg-gradient-to-tr from-blue-500 via-green-500 to-yellow-500 relative cursor-pointer">
          <div className="absolute inset-0 bg-black bg-opacity-70"></div>
          <img
            src={UserProfileImage || userProfileImage || "default-image-url.jpg"}
            alt="User Profile"
            className="w-full h-full object-cover object-center"
          />
          <img src={'camera'} alt="Overlay"
            className="absolute top-0 left-[20px] w-[25px] h-full  opacity-50" />

          <input
            type="file"
            id="UserProfileImageInput"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleUserProfileImageChange}
            className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
          />
        </label> */}

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