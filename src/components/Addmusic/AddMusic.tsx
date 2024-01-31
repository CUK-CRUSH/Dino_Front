import React, { useCallback, useEffect, useState } from "react";
import {
  saveMusic,
  updateArtist,
  updateTitle,
  updateURL,
} from "@reducer/musicadd";
import { setIsEditMusics } from "@reducer/editMusic/editMusic";
import { RootState } from "@store/index";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toggleShowInformation } from "@reducer/toggle/addMusicToggle";
import { AddMusicInput } from "@components/Addmusic/AddMusicInput";
import Swal from "sweetalert2";
import AddButton from "@components/Addmusic/Button/AddButton";
import AddMusicTitle from "@components/Addmusic/Title/AddMusicTitle";
import AddBackButton from "@components/Addmusic/Button/AddBackButton";
import { useTranslation } from "react-i18next";
import { playAutoComplete } from "@api/AutoComplete/AutocompleteControl";
import EditButton from "./Button/EditButton";
import { patchMusicList } from "@api/music-controller/musicControl";
import { useCookies } from "react-cookie";
import {
  setMusicData,
  updateMusicArtist,
  updateMusicTitle,
  updateMusicUrl,
} from "@reducer/editMusic/editMusicData";

const AddMusic: React.FC = () => {
  const { t } = useTranslation("AddMusic");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { musicId } = useParams();

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
  const musicData = useSelector((state: RootState) => state.musicAdd);
  const EditMusicData = useSelector(
    (state: RootState) => state.musicDataReducer
  );

  const { title, artist, url } = musicData;
  const { editTitle, editArtist, editUrl } = EditMusicData;

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isEditMusics) {
      dispatch(updateMusicTitle(e.target.value));
    } else {
      dispatch(updateTitle(e.target.value));
    }
  };

  const handleArtistChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isEditMusics) {
      dispatch(updateMusicArtist(e.target.value));
    } else {
      dispatch(updateArtist(e.target.value));
    }
  };

  const handleURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isEditMusics) {
      dispatch(updateMusicUrl(e.target.value));
    } else {
      dispatch(updateURL(e.target.value));
    }
  };

  const { showInformation } = useSelector(
    (state: RootState) => state.addMusicInformationToggle
  );
  const { isEditMusics } = useSelector(
    (state: RootState) => state.editMusicsToggle
  );

  const handleInformationToggle = useCallback(() => {
    dispatch(toggleShowInformation());
  }, [dispatch]);

  const handleSave = useCallback(async () => {
    // async 키워드 추가
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
      if (isEditMusics) {
        dispatch(
          setMusicData({ title: editTitle, artist: editArtist, url: editUrl })
        );
      } else {
        dispatch(updateTitle(title));
        dispatch(updateArtist(artist));
        dispatch(updateURL(url));
      }
      dispatch(saveMusic());
      navigate(-1);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  }, [
    navigate,
    url,
    dispatch,
    artist,
    title,
    t,
    isEditMusics,
    editTitle,
    editArtist,
    editUrl,
  ]); // 의존성 배열에 playlistId와 token 추가

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handlePatchClick = async () => {
    if ((isEditMusics && editTitle) || (musicData && musicData.title)) {
      await patchMusicList(
        Number(musicId),
        isEditMusics ? editTitle : musicData.title,
        isEditMusics ? editArtist : musicData.artist,
        isEditMusics ? editUrl : musicData.url,
        token
      );
    }

    dispatch(setIsEditMusics(false));
    dispatch(updateTitle(""));
    dispatch(updateArtist(""));
    dispatch(updateURL(""));
    navigate(-1);
  };

  useEffect(() => {
    fetchAutoComplete("title", title);
    fetchAutoComplete("artist", artist);
    if (!musicId) {
      dispatch(setIsEditMusics(false));
    }
  }, [title, artist, fetchAutoComplete, dispatch, musicId]);

  return (
    <div className="relative z-30 h-full w-full flex flex-col bg-black text-white py-10 text-[17px] leading-[18px]">
      <AddBackButton handleBack={handleBack} />
      <AddMusicTitle title={isEditMusics ? "음악 수정하기" : t("musicTitle")} />
      <div className="space-y-8 mx-4">
        <AddMusicInput
          label={t("title")}
          placeholder={t("title")}
          value={isEditMusics ? editTitle : title}
          required={true}
          onChange={handleTitleChange}
          suggestions={suggestions["title"]}
          onSuggestionClick={(suggestion) => dispatch(updateTitle(suggestion))}
        />
        <AddMusicInput
          label={t("artist")}
          placeholder={t("artist")}
          value={isEditMusics ? editArtist : artist}
          required={true}
          onChange={handleArtistChange}
          suggestions={suggestions["artist"]}
          onSuggestionClick={(suggestion) => dispatch(updateArtist(suggestion))}
        />
        <AddMusicInput
          label="URL"
          placeholder="https://youtu.be"
          value={isEditMusics ? editUrl : url}
          required={true}
          onChange={handleURLChange}
          infoButton={true}
          infoText={showInformation ? t("toggle") : ""}
          infoToggleHandler={handleInformationToggle}
        />
        {isEditMusics ? (
          <EditButton handlePatch={handlePatchClick} plusText={t("edit")} />
        ) : (
          <AddButton handleSave={handleSave} plusText={t("plus")} />
        )}
      </div>
    </div>
  );
};

export default AddMusic;
