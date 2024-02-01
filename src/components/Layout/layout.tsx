import { setIsEditing } from "@reducer/editPlayList/isEdit";
import {
  updateArtist,
  updateImage,
  updateTitle,
  updateURL,
} from "@reducer/musicadd";
import React, { useEffect } from "react";
import { batch } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { LayoutDTO } from "types/layout";

const Layout: React.FC<LayoutDTO> = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    batch(() => {
      dispatch(updateTitle(""));
      dispatch(updateArtist(""));
      dispatch(updateURL(""));
      dispatch(updateImage(null));
      dispatch(setIsEditing(false));
    });
  }, [location.pathname, dispatch]);
  return (
    <div className="overflow-hidden bg-[#111111]">
      <div className="h-full w-full max-h-full flex justify-center">
        <main className="max-w-[390px] smartPhone:max-w-[430px] w-full h-screen overflow-y-auto overflow-x-hidden relative font-PretendardRegular">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
