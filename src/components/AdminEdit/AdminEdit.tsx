import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserBackgroundImage, updateProfile, setUserProfileImage } from "@reducer/Admin/userProfileSlice";
import { RootState } from "@store/index";
import useWindowSizeCustom from "@hooks/useWindowSizeCustom";
import '../../styles/Admin/style.css';
import EditButton from "@components/AdminEdit/EditButton";
import SetUserProfileBackground from "@components/AdminEdit/SetUserProfileBackground";
import SetUserProfileImage from "@components/AdminEdit/SetUserProfileImage";
import SetUserProfileInfo from "@components/AdminEdit/SetUserProfileInfo";

interface AdminEditModalProps {
  onClose: () => void; // A function to close the modal
}

const AdminEdit: React.FC<AdminEditModalProps> = ({ onClose }) => {
  
  
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
      dispatch(setUserBackgroundImage(userProfile.userBackgroundImage));
    }
    cancel();
  };

  const close = () => {
    onClose(); // Close the modal without saving changes
  };

  // 배경화면
  const handleUserProfileBackgroundImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserBackgroundImage(imageUrl);
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
       <SetUserProfileImage userProfileImage={userProfile.userProfileImage} handleUserProfileImage={handleUserProfileImageChange}/>  

        {/* 유저 닉네임 */}
        <SetUserProfileInfo placeholder='User Name' maxlength={999} context={username} func={setUsername} />

        {/* 한줄소개 */}
        <SetUserProfileInfo placeholder='Comment' maxlength={50} context={introText} func={setIntroText} />
        
      </div>
    </div>

  );
};

export default AdminEdit;