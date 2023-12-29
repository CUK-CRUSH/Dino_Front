import React, { useEffect} from "react";
import { EditProfileDTO } from "types/Admin";

export const EditProfile = ({top,left,openEditModal, closeOptionsModalOpen } : EditProfileDTO ) => {

  // 스크롤 방지이벤트
  useEffect(() => {
    document.body.style.cssText = `
          position: fixed; 
          top: -${window.scrollY}px;
          overflow-y: hidden;
          width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  return (
    <div 
      onClick={closeOptionsModalOpen}
      className="fixed top-0 right-0 bottom-0 left-0 bg-black bg-opacity-0 z-50">
      <div
        className="fixed"
        style={{ top: top, left: left }}
      >
        <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
        <div className="relative w-40 p-0 bg-white rounded-[10px] shadow-lg">

          <div className="p-1">
            <div
              className="block text-black hover:bg-gray-300 p-2 w-full text-center cursor-pointer"
              onClick={openEditModal}
            >
              Edit Profile
            </div>
            <div className="w-11/12 border-b border-gray-300 mx-auto"></div>

            <button className="block text-black hover:bg-gray-300 p-2 w-full text-center">Copy link</button>
          </div>
        </div>
      </div>
    </div>
  )
}