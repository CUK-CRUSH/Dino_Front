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

const AddMusic: React.FC = () => {
  const { t } = useTranslation("AddMusic");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { musicId } = useParams();
  const labels = useSelector((state: RootState) => state.labels);

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

  //

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
        title: `이 "${url}"은 사용할 수 없어요`,
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
        navigate(-1);
      }, 100);
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "Url형식이 맞지않아요",
      });
    }
  }, [navigate, url, dispatch, artist, title]);

  const handleBack = useCallback(() => {
    dispatch(updateTitle(""));
    dispatch(updateArtist(""));
    dispatch(updateUrl(""));
    navigate(-1);
  }, [navigate, dispatch]);

  useEffect(() => {
    fetchAutoComplete("title", title);
    fetchAutoComplete("artist", artist);
  }, [title, artist, fetchAutoComplete, dispatch, musicId]);

  useEffect(() => {
    navigate("/");
  }, [navigate]);
  return (
    <div className="scrollbar-hide overflow-scroll relative z-30 h-full w-full flex flex-col bg-black text-white py-10 text-[17px] leading-[18px]">
      <div className="mt-14 mx-4">
        <div className="flex flex-row mb-5 text-[18px]">
          <button className="mr-2">
            <img src={YoutubeIcon} alt="Youtube" />
          </button>

          <p className="mt-[2px]">유튜브에서 음악 검색하기</p>
        </div>
        {/* 검색 타입 토글 버튼 */}
        <div className="flex w-[177px] h-[50px] items-center bg-[#2E2E2E] p-2 rounded-2xl ">
          <button
            onClick={toggleSearchType}
            className="flex w-[160px] items-center justify-between"
          >
            <p className=" text-[12px] ">
              {searchType === "title" ? "제목으로 검색" : "아티스트로 검색"}
            </p>

            <img src={Switch} alt="Switch" />
          </button>
        </div>

        {/* 검색 폼 */}

        <form onSubmit={handleSearch} className="relative my-4 ">
          <MusicInput
            type="text"
            label=""
            placeholder={
              searchType === "title" ? "제목으로 검색" : "아티스트로 검색"
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
            검색 하지 않고 바로 입력하고 싶다면?{" "}
            <button
              className="border-b-[1px] border-white"
              onClick={handleDefaultInput}
            >
              직접 입력하기
            </button>
          </p>
        </div>
      </div>
      <AddBackButton handleBack={handleBack} />

      {searchClick && (
        <div className="space-y-8 mx-4">
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

          <AddButton handleSave={handleSave} plusText={t("plus")} />
        </div>
      )}
    </div>
  );
};

export default AddMusic;
