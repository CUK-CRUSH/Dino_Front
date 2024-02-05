import { setIsEditing } from "@reducer/editPlayList/isEdit";
import {
  updateArtist,
  updateImage,
  updateTitle,
  updateURL,
} from "@reducer/musicadd";
import { usePreviousLocation } from "@utils/RouteRedux/isRouting";
import React, { useEffect } from "react";
import { batch, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { LayoutDTO } from "types/layout";

const Layout: React.FC<LayoutDTO> = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const prevLocation = usePreviousLocation();

  useEffect(() => {
    // EditPlayList에서 Admin으로 이동하는 경우에만 상태 초기화
    if (
      prevLocation.pathname.includes("/EditPlayList") &&
      location.pathname.includes("/user")
    ) {
      batch(() => {
        dispatch(updateTitle(""));
        dispatch(updateArtist(""));
        dispatch(updateURL(""));
        dispatch(updateImage(null));
        dispatch(setIsEditing(false));
      });
    }
  }, [location.pathname, prevLocation.pathname, dispatch]);
  return (
    <div className="overflow-hidden  scrollbar-hide bg-[#111111]">
      <div className="h-full w-full max-h-full flex justify-center">
        <main className="max-w-[390px] smartPhone:max-w-[430px] w-full h-screen overflow-y-auto overflow-x-hidden relative font-PretendardRegular">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
