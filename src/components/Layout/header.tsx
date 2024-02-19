import OpenOption from "@components/Admin/Button/OpenOption";
import { EditProfile } from "@components/Admin/Modal/EditProfile";
import AdminEditModal from "@pages/Admin/AdminEditModal";
import { useState } from "react";
import logo from "@assets/Header/logo.svg";
import { Img } from "react-image";
import { Link } from "react-router-dom";

const Header = ({ authority }: { authority?: boolean }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  // 옵션 모달 열기 이벤트
  const [optionsModalPosition, setOptionsModalPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });

  const [isOptionsModalOpen, setOptionsModalOpen] = useState(false);

  // const openOptionsModal = () => {
  //   setOptionsModalOpen(true);
  // };

  const closeOptionsModal = () => {
    setOptionsModalOpen(false);
  };

  // // 옵션모달 열리는 창 위치
  // const calculateOptionsModalPosition = (e: React.MouseEvent<EventTarget>) => {
  //   const button = e.target as HTMLElement;
  //   const rect = button.getBoundingClientRect();

  //   setOptionsModalPosition({
  //     top: rect.top + rect.height,
  //     left: rect.left - 160 + rect.width,
  //   });

  //   openOptionsModal();
  // };

  return (
    <header className="absolute w-full top-0 h-[100px] bg-transparent">
      <Link to="/">
        <Img
          src={logo}
          alt="logo"
          className="absolute top-[25px] left-[20px] cursor-pointer"
        />
      </Link>
      {/* ... 설정창 */}
      {<OpenOption />}
      {/* ...설정창 펼치기 */}
      {isOptionsModalOpen && (
        <EditProfile
          top={optionsModalPosition.top}
          left={optionsModalPosition.left}
          openEditModal={openEditModal}
          closeOptionsModalOpen={closeOptionsModal}
          authority={authority}
        />
      )}

      {/* 프로필 수정 모달 펼치기 */}
      {isEditModalOpen && <AdminEditModal onClose={closeEditModal} />}
    </header>
  );
};

export default Header;
