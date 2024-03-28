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
import "@styles/Tutorial/tutorial.css";
import { youtubeAPIData } from "@api/youtube";

interface VideoSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    default: { url: string; width: number; height: number };
    medium: { url: string; width: number; height: number };
    high: { url: string; width: number; height: number };
  };
  channelTitle: string;
  liveBroadcastContent: string;
  publishTime: string;
}

interface Video {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  snippet: VideoSnippet;
}

const AddMusic: React.FC = () => {
  const swalButton = Swal.mixin({
    customClass: {
      popup: "tutorial-popup", // 모달 전체 배경

      confirmButton: "tutorial-confirm-button", // 확인 버튼
      title: "tutorial-title", // 타이틀
      htmlContainer: "tutorial-content", // HTML 내용 컨테이너
    },
    buttonsStyling: false,
  });

  const { t } = useTranslation("AddMusic");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { musicId } = useParams();
  const { username } = useParams<{ username: string | undefined }>();

  const { tutorialStep, toggleTutorialMode, setTutorialStep } = useTutorial();
  const isTutorialMode = tutorialStep !== null;

  const [localTitle, setLocalTitle] = useState("");
  const [localArtist, setLocalArtist] = useState("");
  const [localUrl, setLocalUrl] = useState("");

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
  console.log(suggestions);
  // 검색 토글에 따른 데이터

  const [searchClick, setSearchClick] = useState<boolean>(false); // 검색 버튼을 누름에 따라 나오는 데이터들

  const handleDefaultInput = () => {
    setSearchClick((prevSearchClick) => !prevSearchClick);
  };

  // url 제한
  const fromButton = useRecoilValue(fromButtonState);
  const setFromButtonState = useSetRecoilState(fromButtonState);

  const musicData = useSelector((state: RootState) => state.musicAdd);
  const { title, artist, url } = musicData;

  const handleTitleChange = (e: any) => {
    const newTitle = e.target.value;
    setLocalTitle(newTitle);
    dispatch(updateTitle(newTitle)); // Assuming you have such an action
  };

  const handleArtistChange = (e: any) => {
    const newArtist = e.target.value;
    setLocalArtist(newArtist);
    dispatch(updateArtist(newArtist)); // Assuming you have such an action
  };

  const handleUrlChange = (e: any) => {
    const newUrl = e.target.value;
    setLocalUrl(newUrl);
    dispatch(updateUrl(newUrl)); // Assuming you have such an action
  };

  const handleSave = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault(); // 폼 제출 또는 버튼 기본 동작 방지

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
        dispatch(updateMusic({ title, artist, url }));
        dispatch(saveMusic());
        dispatch(updateTitle(""));
        dispatch(updateArtist(""));
        dispatch(updateUrl(""));
        setFromButtonState(false);

        navigate(-1);
      } catch (error) {
        Swal.fire({
          icon: "error",
          text: t("urlerror"),
        });
      }
      // 의존성 배열에 e를 포함시킬 필요는 없습니다.
    },
    [navigate, url, dispatch, artist, title, setFromButtonState, t]
  );

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
      swalButton
        .fire({
          title: `<span class="tutorial-title">이제,<br/>MyList를<br/>제대로 만나볼까요?</span>`,
          html: `<span class="tutorial-content">튜토리얼은 끝!<br/> 지금부터는<br/> 내 취향이 잔뜩 담긴<br/> 플레이리스트를 만들러가요!</span>`,
          confirmButtonText: "▶️",
          customClass: {
            popup: "tutorial-popup",
            confirmButton: "tutorial-confirm-button",
            title: "tutorial-title",
            htmlContainer: "tutorial-content",
          },
          buttonsStyling: false,
          allowOutsideClick: false,
        })
        .then((result) => {
          if (result.isConfirmed) {
            localStorage.setItem("tutorial", "true");
            setTutorialStep(null);
            navigate(`/user/${username}`);
          }
        });
    }
  }, [navigate, fromButton, tutorialStep, username]);

  const handlePageClick = (e: any) => {
    // 튜토리얼 모드가 아니거나, 현재 튜토리얼 단계가 list2일 때는 함수 실행을 중지
    if (!isTutorialMode) {
      e.stopPropagation(); // 이벤트 전파를 막음
      return;
    }

    // list2가 아닐 때만 튜토리얼 모드를 전환
    toggleTutorialMode();
  };
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [videos, setVideos] = useState<Video[]>([]); // Use the Video interface here
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const handleYotubeSearch = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    try {
      const data = await youtubeAPIData(5, searchTerm);
      if (data && data.items) {
        setVideos(data.items);
        setSelectedVideo(null);
      } else {
        console.log("No data returned from the API");
      }
    } catch (error) {
      console.error("Failed to fetch YouTube data", error);
    }
  };

  const handleImageClick = (video: Video) => {
    setSelectedVideo(video); // Optional: store the selected video for other uses
    dispatch(updateTitle(video.snippet.title));
    dispatch(updateArtist(video.snippet.channelTitle));
    dispatch(updateUrl(`https://www.youtube.com/watch?v=${video.id.videoId}`));
    setVideos([]); // 검색 결과 초기화
    setSearchClick(true);
  };

  useEffect(() => {
    if (selectedVideo) {
      setLocalTitle(selectedVideo.snippet.title);
      setLocalArtist(selectedVideo.snippet.channelTitle);
      setLocalUrl(
        `https://www.youtube.com/watch?v=${selectedVideo.id.videoId}`
      );
    }
  }, [selectedVideo]);

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

        {/* 검색 폼 */}

        <form
          onSubmit={handleYotubeSearch}
          className={`relative my-4 ${
            tutorialStep === "add1" ? "pointer-events-none" : ""
          }`}
        >
          <MusicInput
            type="text"
            label=""
            placeholder={"검색어 입력"}
            value={searchTerm}
            required={true}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              fetchAutoComplete("youtube", e.target.value); // 예: "youtube" 필드에 대한 자동완성
            }}
            suggestions={suggestions["youtube"] || []} // "youtube" 키에 대한 자동완성 제안 사용
            onSuggestionClick={(suggestion) => {
              setSearchTerm(suggestion);
              // 필요한 경우 추가 동작, 예: 자동완성 제안으로 검색 실행
            }}
          />

          <button type="submit" className="absolute right-4 bottom-4">
            <img src={Search} alt="Search" />
          </button>
        </form>
        <>
          {videos.map((video) => (
            <div
              onClick={() => handleImageClick(video)}
              key={video.id.videoId}
              className="flex items-center space-x-4 rounded-lg shadow-lg p-4"
            >
              <img
                src={video.snippet.thumbnails.high.url}
                alt={video.snippet.title}
                className="w-[150px] h-auto flex-none rounded-lg"
              />
              <div className="flex-grow">
                <p className="text-lg font-semibold">
                  {video.snippet.title.length > 30
                    ? video.snippet.title.substring(0, 30) + "..."
                    : video.snippet.title}
                </p>
                <p className="text-sm text-[#6C6C6C]">
                  {video.snippet.channelTitle}
                </p>
              </div>
            </div>
          ))}
          {videos.length > 0 && (
            <p className="text-[#6C6C6C] text-[12px] text-center">
              유튜브 검색결과 기준, 상단 5개까지 표시됩니다.
            </p>
          )}
        </>
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
            label="Title"
            placeholder="Title"
            value={localTitle}
            required={true}
            onChange={handleTitleChange}
          />
          <MusicInput
            type="text"
            label="Artist"
            placeholder="Artist"
            value={localArtist}
            required={true}
            onChange={handleArtistChange}
          />
          <MusicInput
            type="url"
            label="URL"
            placeholder="https://youtu.be"
            value={localUrl}
            required={true}
            onChange={handleUrlChange}
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
