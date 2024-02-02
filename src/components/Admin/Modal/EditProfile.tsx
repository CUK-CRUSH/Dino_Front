import React, { useEffect } from "react";
import { EditProfileDTO } from "types/Admin";
import { useLocation } from "react-router-dom";
import "../../../styles/Admin/style.css";
import useCopyToClipboard from "@hooks/useCopyToClipboard/useCopyToClipboard";

export const EditProfile = ({
  top,
  left,
  openEditModal,
  closeOptionsModalOpen,
}: EditProfileDTO) => {
  const location = useLocation();
  const userId = Number(localStorage.getItem("userId"));
  const tokenId = Number(localStorage.getItem("tokenId"));

  // 스크롤 방지이벤트
  useEffect(() => {
    document.body.style.cssText = `
          position: fixed; 
          top: -${window.scrollY}px;
          overflow-y: hidden;
          width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  // 앞 주소 ex) https://localhost3000
  const baseUrl = window.location.origin;

  const { handleCopyToClipboard } = useCopyToClipboard();

  const handleClick = (text: string) => {
    handleCopyToClipboard(text);
  };

  console.log(userId, tokenId);
  return (
    <div
      onClick={closeOptionsModalOpen}
      className="fixed top-0 right-0 bottom-0 left-0 bg-white bg-opacity-0 z-50"
    >
      <div className="fixed" style={{ top: top, left: left }}>
        <div className={`relative w-40 p-0 bg-white rounded-[10px] shadow-lg `}>
          <div className="p-1">
            {userId === tokenId && (
              <div
                className="block text-black hover:bg-gray-300 p-2 w-full text-center cursor-pointer"
                onClick={openEditModal}
              >
                프로필 편집
              {/* Edit Profile */}
              </div>
            )}
            <div className="w-11/12 border-b border-gray-300 mx-auto"></div>

            <button
              className="block text-black hover:bg-gray-300 p-2 w-full text-center"
              onClick={() => handleClick(`${baseUrl}${location.pathname}`)}
            >
            링크 복사하기
              {/* Copy Link */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
