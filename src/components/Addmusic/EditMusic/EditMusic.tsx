import React, { useCallback, useEffect, useState } from "react";
import { updateArtist, updateTitle, updateUrl } from "@reducer/musicadd";
import { RootState } from "@store/index";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { MusicInput } from "@components/Addmusic/MusicInput";
import Swal from "sweetalert2";
import AddBackButton from "@components/Addmusic/Button/AddBackButton";
import { useTranslation } from "react-i18next";
import { playAutoComplete } from "@api/AutoComplete/AutocompleteControl";
import EditButton from "@components/Addmusic/Button/EditButton";
import { patchMusicList } from "@api/music-controller/musicControl";
import { useCookies } from "react-cookie";
import MusicTitle from "../Title/MusicTitle";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { fromButtonState } from "@atoms/Musics/locationState";

const EditMusic: React.FC = () => {
  const { t } = useTranslation("AddMusic");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { musicId } = useParams();
  const labels = useSelector((state: RootState) => state.labels);
  // recoil에서 id에 맞는 title, artist 가져옴(빈칸채우기)

  // 쿠키에서 유저 id 가져오기
  const [cookies] = useCookies(["accessToken"]);
  const token = cookies.accessToken;
  //

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

  const handleBack = useCallback(() => {
    dispatch(updateTitle(""));
    dispatch(updateArtist(""));
    dispatch(updateUrl(""));
    setFromButtonState(false);

    navigate(-1);
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [navigate, dispatch]);

  const handlePatchClick = async () => {
    if (
      !url.startsWith("https://www.youtube.com/") &&
      !url.startsWith("https://youtu.be/") &&
      !url.startsWith("https://youtube.com/")
    ) {
      Swal.fire({
        icon: "warning",
        title: `You can't use "${url}"`,
        text: `${t("urlWarning")}`,
      });

      return;
    }

    try {
      await patchMusicList(String(musicId), title, artist, url, token);
      dispatch(updateTitle(""));
      dispatch(updateArtist(""));
      dispatch(updateUrl(""));
      setFromButtonState(false);

      navigate(-1);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  useEffect(() => {
    fetchAutoComplete("title", title);
    fetchAutoComplete("artist", artist);
  }, [title, artist, fetchAutoComplete, dispatch, musicId]);

  useEffect(() => {
    if (!fromButton) {
      navigate("/");
    }
  }, [navigate, fromButton]);

  return (
    <div className="scrollbar-hide overflow-scroll relative z-30 h-full w-full flex flex-col bg-black text-white py-10 text-[17px] leading-[18px]">
      <AddBackButton handleBack={handleBack} />
      <div className="space-y-8 mx-4">
        <MusicTitle title={"음악 수정하기"} />
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

        <EditButton handlePatch={handlePatchClick} plusText={t("edit")} />
      </div>
    </div>
  );
};

export default EditMusic;
