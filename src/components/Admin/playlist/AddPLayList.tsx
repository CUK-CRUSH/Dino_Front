import React, { useState } from "react";
import plus from "../../../assets/Admin/plus.svg";
import { postPlayList } from "@api/playlist-controller/playlistControl";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToast } from "@reducer/Toast/toast";
import { useCustomPlaylistMargin } from "@hooks/useCustomMargin/useCustomPlaylistMargin";
import { useTranslation } from "react-i18next";
import { useTutorial } from "@hooks/useTutorial/useTutorial";

export const AddPlayList = ({
  isTutorialMode,
}: {
  isTutorialMode?: boolean;
}) => {
  const customMargin = useCustomPlaylistMargin();
  const { t } = useTranslation("AddPlayList");

  const [cookie] = useCookies();
  let token = cookie.accessToken;
  // 더미데이터
  const [title] = useState(null);
  const [titleImage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddPlaylist = async (
    title: null,
    titleImage: null,
    token: string
  ) => {
    const post = await postPlayList(title, titleImage, token);
    if (post && post.status === 200) {
      dispatch(setToast("add"));
      navigate(`${post.data.id}`);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    handleAddPlaylist(title, titleImage, token);
  };
  const { tutorialStep, setTutorialStep } = useTutorial();
  const handleAddPlaylistClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (tutorialStep === "playlist") {
      handleAddPlaylist(title, titleImage, token); // 실제 추가 로직 실행
      // 다음 튜토리얼 단계로 넘어가기
      // 예시: setTutorialStep('nextStep');
    }
  };
  const optionsBgClass = isTutorialMode
    ? "opacity-100 bg-[#2E2E2E] absolute w-[150px] right-1 top-2 h-[150px] rounded-xl z-20 flex items-center"
    : "bg-transparent";

  return (
    <div
      style={{
        marginLeft: `${customMargin}px`,
        marginRight: `${customMargin}px`,
      }}
      className="inline-block h-[200px] mt-[15px] relative cursor-pointer"
      onClick={isTutorialMode ? handleAddPlaylistClick : undefined}
    >
      <div
        onClick={handleClick}
        style={{ background: "#2E2E2E" }}
        className="w-[150px] h-[150px] rounded-[13px] font-light text-zinc-300 text-4xl "
      >
        {isTutorialMode && (
          <>
            {/* 이 부분은 튜토리얼 모드일 때만 나타나야 합니다 */}
            <div className={`${optionsBgClass}`}>
              <img
                className="mx-auto mb-[10px] w-[18.2%] h-full"
                src={plus}
                alt="Plus Icon"
              />
              <div className="absolute bottom-[10%] left-0 right-0 text-center text-zinc-300 text-[12px] font-medium">
                {t("newplaylist")}
              </div>
            </div>
            <div className="relative flex justify-end items-center h-full">
              {/* 말풍선을 아이콘의 오른쪽 옆에 배치하기 위해 위치 조정 */}
              <div className="bg-white absolute left-40 top-10 w-[200px] h-[60px] rounded-xl z-20 flex items-center justify-center p-2">
                <span className="text-black text-sm">
                  새로운 플레이리스트를
                  <br />
                  추가할 수 있어요
                </span>
              </div>
              <div className="w-5 h-5 bg-white absolute left-[155px] top-[60px] z-[19] transform rotate-45"></div>
            </div>
          </>
        )}

        {!isTutorialMode && (
          <>
            {/* 이 부분은 튜토리얼 모드가 아닐 때만 나타나야 합니다 */}
            <img
              className="mx-auto mt-[0px] w-[18.2%] h-full"
              src={plus}
              alt="Plus Icon"
            />
            <div className="absolute bottom-[30%] left-0 right-0 text-center text-zinc-300 text-[12px] font-medium font-['Noto Sans']">
              {t("newplaylist")}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
