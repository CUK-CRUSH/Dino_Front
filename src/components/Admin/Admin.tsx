import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"; // Import the useDispatch hook
import { RootState } from "@store/index";
import AdminEditModal from "@pages/Admin/AdminEditModal";
import { AddPalyList } from "@components/Admin/AddPLayList";
import { EditProfile } from "@components/Admin/EditProfile";
import UserProfileBackground from "./UserProfileBackgroundImage";
import OpenOption from "./OpenOption";
import UserProfileImage from "./UserProfileImage";
import UserProfileInfo from "./UserProfileInfo";

const AdminPage: React.FC = () => {

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // 유저네임 , 한줄소게
  const [username, setUsername] = useState("");
  const [introText, setIntroText] = useState("");

  // 유저 프로필 불러오기
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
    const button = e.target as HTMLElement; 
    const rect = button.getBoundingClientRect();
    
    setOptionsModalPosition({
      top: rect.top + rect.height,
      left: rect.left - 160 + rect.width,
    });
  
    openOptionsModal();
  };

  useEffect(() => {
    if (userProfile) {
      setUsername(userProfile.username);
      setIntroText(userProfile.introText);
    }
  }, [userProfile]);

  return (
      <div className=" h-full w-full relative bg-white">

        <UserProfileBackground userBackgroundImage={userProfile.userProfileBackgroundImage} />

        <div className="h-full w-full left-0 top-[167px] absolute bg-neutral-900 rounded-tl-[30px] rounded-tr-[30px]" >
          {/* ... 설정창 */}
          <OpenOption calculateOptionsModalPosition={calculateOptionsModalPosition} />

          {/* ...설정창 펼치기 */}
          {isOptionsModalOpen && (
            <EditProfile
              top={optionsModalPosition.top}
              left={optionsModalPosition.left}
              openEditModal={openEditModal}
              closeOptionsModalOpen={closeOptionsModal} />
          )}

          {/* 프로필 수정 모달 펼치기 */}
          {isEditModalOpen && (
            <AdminEditModal  onClose={closeEditModal} />
          )}

          {/* 프로필 이미지 */}
          <div className=" flex items-center flex-col z-40">
            
            <UserProfileImage userProfileImage={userProfile.userProfileImage} />

            <UserProfileInfo username={username} introText={introText} />

          </div>  
          
          {/* 내가 생성한 플레이리스트 뽑아주고 마지막에 플레이리스트 추가 컴포넌트 붙이기. */}
          <AddPalyList />

        </div>
      </div>
  );
};



export default AdminPage