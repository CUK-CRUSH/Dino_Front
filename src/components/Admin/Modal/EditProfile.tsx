import React, { useEffect } from "react";
import { EditProfileDTO } from "types/Admin";
import "../../../styles/Admin/style.css";

export const EditProfile = ({
  top,
  left,
  openEditModal,
  closeOptionsModalOpen,
}: EditProfileDTO) => {
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

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "MyList",
          text: "Check out MyList!",
          url: window.location.href,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      console.log("Web Share API is not supported in your browser.");
    }
  };
  // console.log(userId, tokenId);
  return (
    <div
      onClick={closeOptionsModalOpen}
      className="fixed top-0 right-0 bottom-0 left-0 bg-white bg-opacity-0 z-50"
    >
      <div className="fixed" style={{ top: top, left: left }}>
        <div className={`relative w-40 p-0 bg-white rounded-[10px] shadow-lg `}>
          <div className="p-1">
            {userId === tokenId && tokenId && (
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
              onClick={() => handleShare()}
            >
              링크 공유하기
              {/* Copy Link */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
