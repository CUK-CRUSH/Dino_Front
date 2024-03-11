import { useState } from "react";
import plus from "../../../assets/Admin/plus.svg";
import { postPlayList } from "@api/playlist-controller/playlistControl";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToast } from "@reducer/Toast/toast";
import { useCustomPlaylistMargin } from "@hooks/useCustomMargin/useCustomPlaylistMargin";
import {useTranslation} from "react-i18next";

export const AddPlayList = () => {

 const customMargin = useCustomPlaylistMargin();
  const { t } = useTranslation("AddPlayList");

  const [cookie] = useCookies();
  let token = cookie.accessToken;
  // 더미데이터
  const [title] = useState(null);
  const [titleImage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleAddPlaylist = async (title : null, titleImage: null, token : string) => {
    const post = await postPlayList(title, titleImage, token);
    if (post && post.status === 200) {
      dispatch(setToast("add"));
      navigate(`${post.data.id}`)
      
    }
  };

  const handleClick = () => {
    handleAddPlaylist(title, titleImage, token);
  };

  return (
    <div style={{ marginLeft: `${customMargin}px`, marginRight: `${customMargin}px` }} className="inline-block h-[200px] mt-[15px] relative cursor-pointer">

      <div onClick={handleClick} style={{ background: '#2E2E2E' }} className="w-[150px] h-[150px] rounded-[13px] font-light text-zinc-300 text-4xl ">

        <img className="mx-auto mt-[0px] w-[18.2%] h-full" src={plus} alt="Plus Icon" />

        <div className="absolute bottom-[30%] left-0 right-0 text-center text-zinc-300 text-[12px] font-medium font-['Noto Sans']">
            {t("newplaylist")}
        </div>
      </div>
    </div>
  );
};