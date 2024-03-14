import Galaxy from "@components/Pwa/Galaxy";
import { setIsEditing } from "@reducer/editPlayList/isEdit";
import {
  updateArtist,
  updateImage,
  updateTitle,
  updateUrl,
} from "@reducer/musicadd";
import { usePreviousLocation } from "@utils/RouteRedux/isRouting";
import React, { useEffect, useCallback, useState } from "react";

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




  return (
    <div className="overflow-hidden  scrollbar-hide bg-[#111111]">
      <div className="min-h-screen h-auto w-full max-h-full flex justify-center">
        <main className="max-w-[390px] smartPhone:max-w-[431px] w-full min-h-screen h-auto overflow-y-auto overflow-x-hidden relative font-PretendardRegular">
          {children}

          {/* 설치유도 팝업 */}
          <Galaxy />
          {/*  */}
          
        </main>
      </div>
    </div>
  );
};

export default Layout;
