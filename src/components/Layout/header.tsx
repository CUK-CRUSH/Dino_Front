import OpenOption from "@components/Admin/Button/OpenOption";
import { EditProfile } from "@components/Admin/Modal/EditProfile";
import AdminEditModal from "@pages/Admin/AdminEditModal";
import { useState } from "react";
import logo from "@assets/Header/logo.svg";
import { Img } from "react-image";
import { Link } from "react-router-dom";
import SearchButton from "@components/Admin/Button/SearchButton";

const Header = ({ authority, id }: { authority?: boolean; id?: string }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  // 옵션 모달 열기 이벤트

  const [isOptionsModalOpen, setOptionsModalOpen] = useState(false);

  const closeOptionsModal = () => {
    setOptionsModalOpen(false);
  };

  return (
    <header className="absolute w-full top-0 h-[5%] bg-transparent">
      <Link to="/">
        <Img
          src={logo}
          alt="logo"
          className="absolute top-[25px] left-[20px] cursor-pointer"
        />
      </Link>
      {/* 돋보기 */}
      <SearchButton authority={authority} />
      {/* ... 설정창 */}
      {id && authority && <OpenOption id={id} />}
      {/* ...설정창 펼치기 */}
      {isOptionsModalOpen && (
        <EditProfile
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
