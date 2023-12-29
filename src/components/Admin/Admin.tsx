import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"; // Import the useDispatch hook
import { RootState } from "@store/index";
import AdminEditModal from "@pages/Admin/AdminEditModal";
import Layout from "@components/Layout/layout";
import { AddPalyList } from "@components/Admin/AddPLayList";
import { EditProfile } from "@components/Admin/EditProfile";
import AdminBackground from "./AdminBackground";
import OpenOption from "./OpenOption";
import UserProfileImage from "./ProfileImage";

const AdminPage: React.FC = () => {

  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Local state to manage the modal

  const [username, setUsername] = useState("");
  const [introText, setIntroText] = useState("");

  const userProfile = useSelector((state: RootState) => state.userProfile);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };
  // 옵션 모달 열기 이벤트
  const [optionsModalPosition, setOptionsModalPosition] = useState<{ top: number, left: number }>({ top: 0, left: 0 });

  const [isOptionsModalOpen, setOptionsModalOpen] = useState(false);

  const openOptionsModal = () => {
    setOptionsModalOpen(true);
  };

  const closeOptionsModal = () => {
    setOptionsModalOpen(false);
  };
  // 옵션모달 열리는 창 위치
  const calculateOptionsModalPosition = (e: React.MouseEvent<EventTarget>) => {
    const button = e.target as HTMLElement; // Assuming you're dealing with an HTML element
    const rect = button.getBoundingClientRect();
    console.log(rect);
    setOptionsModalPosition({
      top: rect.top + rect.height,
      left: rect.left - 160 + rect.width,
    });
  
    openOptionsModal();
  };

  useEffect(() => {
    // Update the state with user profile data when it's available
    if (userProfile) {
      setUsername(userProfile.username);
      setIntroText(userProfile.introText);
    }
  }, [userProfile]);


  return (
      <div className=" h-full w-full relative bg-white">

        <AdminBackground />

        <div className="h-full w-full left-0 top-[167px] absolute bg-neutral-900 rounded-tl-[30px] rounded-tr-[30px]" >
          {/* ... 설정창 */}
          <OpenOption calculateOptionsModalPosition={calculateOptionsModalPosition} />

          {isOptionsModalOpen && (
            <EditProfile
              top={optionsModalPosition.top}
              left={optionsModalPosition.left}
              openEditModal={openEditModal}
              closeOptionsModalOpen={closeOptionsModal} />
          )}

          {isEditModalOpen && (
            <AdminEditModal onClose={closeEditModal} />
          )}

          {/* 프로필 이미지 */}
          <div className=" flex items-center flex-col z-40">
            {/* User Profile Icon and Username */}
            <UserProfileImage userProfileImage={userProfile.userProfileImage} />

            <div className="w-[250px] text-center text-white text-[25px] font-bold font-['Noto Sans'] leading-[18px] mt-[19px]">{username}</div>
            <div className="text-center  text-white text-[15px] font-medium font-['Noto Sans'] leading-[18px] mt-[19px]">{introText}</div>
          </div>

          <AddPalyList />
          

        </div>
      </div>
  );
};



export default AdminPage