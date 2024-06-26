import Android from "@components/Pwa/Android";
import Ios from "@components/Pwa/Ios";
import { setIsEditing } from "@reducer/editPlayList/isEdit";
import {
  updateArtist,
  updateImage,
  updateTitle,
  updateUrl,
} from "@reducer/musicadd";
import { usePreviousLocation } from "@utils/RouteRedux/isRouting";
import React, { useEffect, useCallback } from "react";

import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { LayoutDTO } from "types/layout";

const Layout: React.FC<LayoutDTO> = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const prevLocation = usePreviousLocation();

  const resetEditingState = useCallback(() => {
    dispatch(updateTitle(""));
    dispatch(updateArtist(""));
    dispatch(updateUrl(""));
    dispatch(updateImage(null));
    dispatch(setIsEditing(false));
  }, [dispatch]);

  useEffect(() => {
    const prevPathSplit = prevLocation.pathname.split("/");
    const currPathSplit = location.pathname.split("/");

    if (prevPathSplit.length === 4 && currPathSplit.length === 3) {
      resetEditingState();
    }
    if (Date.now() / 1000 > Number(localStorage.getItem("exp"))) {
      localStorage.removeItem("tokenId");
    }
  }, [location.pathname, prevLocation.pathname, resetEditingState]);

  // ios 확인
  const isDeviceIOS = /iPad|iPhone|iPod/.test(window.navigator.userAgent);

    // Admin 컴포넌트 내부
    useEffect(() => {
      // Admin 페이지에 처음 들어왔을 때 navigationCount를 0으로 설정
      sessionStorage.setItem('navigationCount', '0');
  
    }, []);
  return (
    <div className="overflow-hidden  scrollbar-hide bg-[#111111]">
      <div className="min-h-screen h-auto w-full max-h-full flex justify-center">
        <main className="max-w-[390px] smartPhone:max-w-[431px] w-full min-h-screen h-auto overflow-y-auto overflow-x-hidden relative font-PretendardRegular">
          {children}

          {/* 설치유도 팝업 */}
          {isDeviceIOS ?
            <Ios /> : <Android />
          }

          {/*  */}

        </main>
      </div>
    </div>
  );
};

export default Layout;
