import OpenOption from "@components/Admin/Button/OpenOption";
import { EditProfile } from "@components/Admin/Modal/EditProfile";
import AdminEditModal from "@pages/Admin/AdminEditModal";
import { useState } from "react";
import logo from "@assets/Header/logo.svg";
import { Img } from "react-image";
import { useNavigate } from "react-router-dom";
import SearchButton from "@components/Admin/Button/SearchButton";

const Header = ({
  authority,
  id,
  isTutorialMode,
}: {
  authority?: boolean;
  id?: string;
  isTutorialMode: boolean;
}) => {
  const navigate = useNavigate();

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

  const handleNavigate = () => {
    if (localStorage.getItem("homeUrl")) {
      navigate(`/user/${localStorage.getItem("homeUrl")}`);
    } else {
      navigate("/");
    }
  };
  const optionsBgClass = isTutorialMode
    ? "bg-white absolute w-[80px] right-1 top-2 h-[50px] rounded-xl z-20 flex items-center"
    : "bg-transparent";

  return (
    <header className={`absolute w-full top-0 h-[100px]`}>
      <div onClick={handleNavigate}>
        <Img
          src={logo}
          alt="logo"
          className="absolute top-[25px] left-[20px] cursor-pointer"
        />
      </div>
      {/* 돋보기 */}
      {isTutorialMode && (
        <div className="relative flex justify-end items-center h-full">
          {/* 말풍선 */}
          <div className="bg-white absolute left-10 top-2 h-[50px] rounded-xl z-20 flex items-center justify-center p-2">
            <span className="text-black text-sm">
              플레이리스트/유저 검색화면으로 이동해요
            </span>
          </div>

          {/* 화살표 */}
          <div className="w-5 h-5 bg-white absolute right-[98px] top-6 z-[19] transform rotate-45"></div>
        </div>
      )}
      {isTutorialMode && (
        <div className="relative flex justify-end items-center h-full">
          {/* 말풍선 */}
          <div className="bg-white absolute right-3 -top-5 h-[50px] rounded-xl z-20 flex items-center justify-center p-2">
            <span className="text-black text-sm">
              관리 옵션 페이지로 이동해요
            </span>
          </div>

          {/* 화살표 */}
          <div className="w-5 h-5 bg-white absolute right-[23px] -top-7 z-[19] transform rotate-45"></div>
        </div>
      )}
      <div className={`${optionsBgClass}`} />

      <SearchButton authority={authority} />
      {/* ... 설정창 */}
      {id && authority && <OpenOption />}

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
