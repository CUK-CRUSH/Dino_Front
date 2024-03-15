import React, { useCallback, useEffect, useState } from "react";
import {
  saveMusic,
  updateArtist,
  updateMusic,
  updateTitle,
  updateUrl,
} from "@reducer/musicadd";
import YoutubeIcon from "@assets/AddMusic/Youtube.svg";
import Search from "@assets/AddMusic/Search.svg";
import Switch from "@assets/AddMusic/Switch.svg";
import { RootState } from "@store/index";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { MusicInput } from "@components/Addmusic/MusicInput";
import Swal from "sweetalert2";
import AddButton from "@components/Addmusic/Button/AddButton";
import AddBackButton from "@components/Addmusic/Button/AddBackButton";
import { useTranslation } from "react-i18next";
import { playAutoComplete } from "@api/AutoComplete/AutocompleteControl";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { fromButtonState } from "@atoms/Musics/locationState";
import { useTutorial } from "@hooks/useTutorial/useTutorial";

const AddMusic: React.FC = () => {
  const { t } = useTranslation("AddMusic");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { musicId } = useParams();
  const { username } = useParams<{ username: string | undefined }>();
  const labels = useSelector((state: RootState) => state.labels);
  const { tutorialStep, toggleTutorialMode } = useTutorial();
  const isTutorialMode = tutorialStep !== null;
  // 자동완성

  const [suggestions, setSuggestions] = useState<{ [key: string]: string[] }>(
    {}
  );
  const fetchAutoComplete = useCallback(
    async (field: string, value: string) => {
      if (value.length > 1) {
        const fetchedSuggestions = await playAutoComplete("ko", value);
        setSuggestions((prev) => ({
          ...prev,
          [field]: fetchedSuggestions.data,
        }));
      } else {
        setSuggestions((prev) => ({ ...prev, [field]: [] }));
      }
    },
    []
  );
  // 검색 토글에 따른 데이터

  const [searchType, setSearchType] = useState<string>("title"); // title이냐 artist냐 와따리가따리 토글
  const [searchClick, setSearchClick] = useState<boolean>(false); // 검색 버튼을 누름에 따라 나오는 데이터들

  const toggleSearchType = () => {
    setSearchType((prevType) => {
      if (prevType === "title") {
        dispatch(updateTitle("")); // artist 상태 초기화

        return "artist";
      } else {
        dispatch(updateArtist("")); // title 상태 초기화

        return "title";
      }
    });

    setSearchClick(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(
      `https://www.youtube.com/results?search_query=${
        searchType === "title" ? title : artist
      }`,
      "_blank"
    );
    setSearchClick(true);
  };

  const handleDefaultInput = () => {
    setSearchClick((prevSearchClick) => !prevSearchClick);
  };

  // url 제한
  const fromButton = useRecoilValue(fromButtonState);
  const setFromButtonState = useSetRecoilState(fromButtonState);

  const musicData = useSelector((state: RootState) => state.musicAdd);
  const { title, artist, url } = musicData;

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateTitle(e.target.value));
  };

  const handleArtistChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateArtist(e.target.value));
  };

  const handleURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateUrl(e.target.value));
  };

  const handleSave = useCallback(async () => {
    if (
      !url.startsWith("https://www.youtube.com/") &&
      !url.startsWith("https://youtu.be/") &&
      !url.startsWith("https://youtube.com/")
    ) {
      Swal.fire({
        icon: "warning",
        title: t("urlerror"),
      });

      return;
    }

    try {
      setTimeout(() => {
        dispatch(updateMusic({ title, artist, url }));
        dispatch(saveMusic());
        dispatch(updateTitle(""));
        dispatch(updateArtist(""));
        dispatch(updateUrl(""));
        setFromButtonState(false);

        navigate(-1);
      }, 100);
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: t("urlerror"),
      });
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [navigate, url, dispatch, artist, title]);

  const handleBack = useCallback(() => {
    dispatch(updateTitle(""));
    dispatch(updateArtist(""));
    dispatch(updateUrl(""));
    setFromButtonState(false);

    navigate(-1);
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [navigate, dispatch]);

  useEffect(() => {
    fetchAutoComplete("title", title);
    fetchAutoComplete("artist", artist);
  }, [title, artist, fetchAutoComplete, dispatch, musicId]);

  useEffect(() => {
    if (!fromButton) {
      navigate("/");
    }
    if (tutorialStep === "add2") {
      handleDefaultInput();
    }
    if (tutorialStep === "end") {
      navigate(`/user/${username}`);
    }
  }, [navigate, fromButton, tutorialStep]);

  const handlePageClick = (e: any) => {
    // 튜토리얼 모드가 아니거나, 현재 튜토리얼 단계가 list2일 때는 함수 실행을 중지
    if (!isTutorialMode) {
      e.stopPropagation(); // 이벤트 전파를 막음
      return;
    }

    // list2가 아닐 때만 튜토리얼 모드를 전환
    toggleTutorialMode();
  };
  console.log(tutorialStep);
  return (
    <div
      className={`scrollbar-hide overflow-scroll relative  h-full w-full flex flex-col bg-black text-white py-10 text-[17px] leading-[18px] ${
        isTutorialMode ? "bg-black bg-opacity-50" : ""
      }`}
      onClick={handlePageClick}
    >
      {isTutorialMode && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-10"></div>
      )}
      <div className={`mt-14 mx-4  ${tutorialStep === "add1" ? "z-20" : ""}`}>
        <div className="flex flex-row mb-5 text-[18px] ">
          <button className="mr-2">
            <img src={YoutubeIcon} alt="Youtube" />
          </button>

          <p className="mt-[2px]">{t("search")}</p>
        </div>

        {/* 검색 타입 토글 버튼 */}
        <div
          className={`flex w-[177px] h-[50px] items-center bg-[#2E2E2E] p-2 rounded-2xl ${
            tutorialStep === "add1" ? "pointer-events-none" : ""
          }`}
        >
          <button
            onClick={toggleSearchType}
            className="flex w-[160px] items-center justify-between"
          >
            <p className=" text-[12px] ">
              {searchType === "title" ? t("titlesearch") : t("artistsearch")}
            </p>

            <img src={Switch} alt="Switch" />
          </button>
          {tutorialStep === "add1" && (
            <>
              <div className="absolute text-[16px] w-[150px] h-[80px] top-28 right-3 mt-1 z-20 bg-white text-black p-2 rounded-md font-bold flex items-center justify-center">
                <div className="text-start">
                  <p className="mb-1">검색기준을</p>
                  <p className="mb-1">전환할 수 있어요</p>
                  <p>(제목 / 아티스트)</p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* 검색 폼 */}

        <form
          onSubmit={handleSearch}
          className={`relative my-4 ${
            tutorialStep === "add1" ? "pointer-events-none" : ""
          }`}
        >
          <MusicInput
            type="text"
            label=""
            placeholder={
              searchType === "title" ? t("titlesearch") : t("artistsearch")
            }
            value={searchType === "title" ? title : artist}
            required={true}
            onChange={
              searchType === "title" ? handleTitleChange : handleArtistChange
            }
            suggestions={suggestions[searchType]}
            onSuggestionClick={(suggestion: string) => {
              dispatch(
                searchType === "title"
                  ? updateTitle(suggestion)
                  : updateArtist(suggestion)
              );
            }}
          />

          <button type="submit" className="absolute right-4 bottom-4">
            <img src={Search} alt="Search" />
          </button>
        </form>

        <div className="mb-10">
          <p className="text-[12px] ml-1">
            {t("directinputdesc")}{" "}
            <button
              className="border-b-[1px] border-white"
              onClick={handleDefaultInput}
            >
              {t("directinput")}
            </button>
          </p>
        </div>
      </div>
      {tutorialStep === "add1" && (
        <>
          <div className="absolute text-[14px] w-[90%] h-[130px] top-[36%] mt-1 z-20 bg-white text-black p-2 rounded-md font-bold flex items-center justify-center">
            <div className="text-start">
              <p className="mb-1">
                음악의 제목 혹은 아티스트의 이름을 검색하면
              </p>
              <p className="mb-1">유튜브 검색결과 창으로 이동해요</p>
              <br />
              <p className="mb-1">유튜브 검색결과 중,</p>
              <p>원하는 영상의 링크를 복사해주세요!</p>
            </div>
          </div>
        </>
      )}
      {tutorialStep === "add1" && (
        <>
          <div className="absolute text-[14px] w-[90%] h-[80px] top-[52%] mt-1 z-20 bg-white text-black p-2 rounded-md font-bold flex items-center justify-center">
            <div className="text-start">
              <p className="mb-1">유튜브 링크를 이미 가지고 있다면,</p>

              <p>"직접 입력하기"로도 음악을 등록할 수 있어요</p>
            </div>
          </div>
        </>
      )}
      <AddBackButton handleBack={handleBack} />

      {tutorialStep === "add2" && (
        <>
          <div className="absolute text-[14px] w-[90%] h-[150px] top-[33%] mt-1 z-30 bg-white text-black p-2 rounded-md font-bold flex items-center justify-center">
            <div className="text-start">
              <p className="mb-1">
                나머지 음악 정보(제목/아티스트)를 입력하고,
              </p>
              <p className="mb-1">복사해온 유튜브 링크를 붙여넣어 주세요.</p>
              <p className="mb-1">밑의 추가하기 버튼을 누르면 끝!</p>
              <br />
              <p className="mb-1 text-[12px] font-semibold">
                더 편리하게 음악을 추가할 수 있도록,
              </p>
              <p className="text-[12px] font-semibold">
                기능이 곧 업데이트 될 예정이에요!
              </p>
            </div>
          </div>
        </>
      )}
      {searchClick && (
        <div
          className={`space-y-8 mx-4 ${tutorialStep === "add2" ? "z-20" : ""}`}
        >
          <MusicInput
            type="text"
            label={labels.title}
            placeholder={labels.title}
            value={title}
            required={true}
            onChange={handleTitleChange}
            suggestions={suggestions["title"]}
            onSuggestionClick={(suggestion) => {
              dispatch(updateTitle(suggestion));
            }}
          />
          <MusicInput
            type="text"
            label={labels.artist}
            placeholder={labels.artist}
            value={artist}
            required={true}
            onChange={handleArtistChange}
            suggestions={suggestions["artist"]}
            onSuggestionClick={(suggestion) => {
              dispatch(updateArtist(suggestion));
            }}
          />
          <MusicInput
            type="url"
            label={labels.URL}
            placeholder="https://youtu.be"
            value={url}
            required={true}
            onChange={handleURLChange}
          />
          <div
            className={`${
              tutorialStep === "add2" ? "pointer-events-none" : ""
            }`}
          >
            <AddButton handleSave={handleSave} plusText={t("plus")} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddMusic;
