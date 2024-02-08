import React, { useCallback, useEffect, useState } from "react";
import { updateArtist, updateTitle, updateUrl } from "@reducer/musicadd";
import { RootState } from "@store/index";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { MusicInput } from "@components/Addmusic/MusicInput";
import Swal from "sweetalert2";
import MusicTitle from "@components/Addmusic/Title/MusicTitle";
import AddBackButton from "@components/Addmusic/Button/AddBackButton";
import { useTranslation } from "react-i18next";
import { playAutoComplete } from "@api/AutoComplete/AutocompleteControl";
import EditButton from "@components/Addmusic/Button/EditButton";
import { patchMusicList } from "@api/music-controller/musicControl";
import { useCookies } from "react-cookie";

const EditMusic: React.FC = () => {
  const { t } = useTranslation("AddMusic");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { musicId } = useParams();
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
    navigate(-1);
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
      await patchMusicList(Number(musicId), title, artist, url, token);
      dispatch(updateTitle(""));
      dispatch(updateArtist(""));
      dispatch(updateUrl(""));
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

  return (
    <div className="relative z-30 h-full w-full flex flex-col bg-black text-white py-10 text-[17px] leading-[18px]">
      <AddBackButton handleBack={handleBack} />
      <MusicTitle title={"음악 수정하기"} />
      <div className="space-y-8 mx-4">
        <MusicInput
          type="text"
          label={t("title")}
          placeholder={t("title")}
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
          label={t("artist")}
          placeholder={t("artist")}
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
          label="URL"
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
