import React, { useCallback, useEffect, useState } from "react";
import { updateArtist, updateTitle, updateURL } from "@reducer/musicadd";
import { RootState } from "@store/index";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleShowInformation } from "@reducer/toggle/addMusicToggle";
import { AddMusicInput } from "@components/Addmusic/AddMusicInput";
import Swal from "sweetalert2";
import AddButton from "@components/Addmusic/Button/AddButton";
import AddMusicTitle from "@components/Addmusic/Title/AddMusicTitle";
import AddBackButton from "@components/Addmusic/Button/AddBackButton";
import { useTranslation } from "react-i18next";
import { useCookies } from "react-cookie";
import useDecodedJWT from "@hooks/useDecodedJWT";
import { getMember } from "@api/member-controller/memberController";
import { getPlayList } from "@api/playlist-controller/playlistControl";
import { postMusicList } from "@api/music-controller/musicControl";
import { playAutoComplete } from "@api/AutoComplete/AutocompleteControl";

const AddMusic: React.FC = () => {
  const { t } = useTranslation("AddMusic");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 쿠키에서 유저 id 가져오기
  const [cookies] = useCookies(["accessToken"]);
  const token = cookies.accessToken;
  const decodedToken = useDecodedJWT(token);
  const id = decodedToken.sub;
  //
  const [playlistId, setPlaylistId] = React.useState<number>(0);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const [title, setTitle] = React.useState<string>("");
  const [artist, setArtist] = React.useState<string>("");
  const [url, setURL] = React.useState<string>("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleArtistChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArtist(e.target.value);
  };

  const handleURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setURL(e.target.value);
  };

  const { showInformation } = useSelector(
    (state: RootState) => state.addMusicInformationToggle
  );

  const handleInformationToggle = useCallback(() => {
    dispatch(toggleShowInformation());
  }, [dispatch]);

  const handleSave = useCallback(async () => {
    // async 키워드 추가
    if (
      !url.startsWith("https://www.youtube.com/") &&
      !url.startsWith("https://youtu.be/")
    ) {
      Swal.fire({
        icon: "warning",
        title: `You can't use "${url}"`,
        text: `${t("urlWarning")}`,
      });
      setTitle("");
      setArtist("");
      setURL("");
      return;
    }

    try {
      await postMusicList(playlistId, title, artist, url, token);

      dispatch(updateTitle(title));
      dispatch(updateArtist(artist));
      dispatch(updateURL(url));
      setTitle("");
      setArtist("");
      setURL("");
      navigate(-1);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  }, [navigate, url, dispatch, artist, title, t, playlistId, token]); // 의존성 배열에 playlistId와 token 추가

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  useEffect(() => {
    const fetchPlaylist = async (id: number) => {
      const member = await getMember(id);
      const playlist = await getPlayList(member.data.username);
      setPlaylistId(playlist.data[0].id);
    };
    if (id !== undefined) {
      fetchPlaylist(id);
    }
    if (title.length > 1) {
      const fetchAutoComplete = async () => {
        const fechedSuggestions = await playAutoComplete("ko", title);
        setSuggestions(fechedSuggestions.data);
      };
      fetchAutoComplete();
    } else {
      setSuggestions([]);
    }
  }, [id, title]);

  return (
    <div className="relative z-30 h-full w-full flex flex-col bg-black text-white py-10 text-[17px] leading-[18px]">
      <AddBackButton handleBack={handleBack} />
      <AddMusicTitle title={t("musicTitle")} />
      <div className="space-y-8 mx-4">
        <AddMusicInput
          label={t("title")}
          placeholder={t("title")}
          value={title}
          required={true}
          onChange={handleTitleChange}
          suggestions={suggestions}
          onSuggestionClick={setTitle}
        />
        <AddMusicInput
          label={t("artist")}
          placeholder={t("artist")}
          value={artist}
          required={true}
          onChange={handleArtistChange}
        />
        <AddMusicInput
          label="URL"
          placeholder="https://youtu.be"
          value={url}
          required={true}
          onChange={handleURLChange}
          infoButton={true}
          infoText={showInformation ? t("toggle") : ""}
          infoToggleHandler={handleInformationToggle}
        />

        <AddButton handleSave={handleSave} plusText={t("plus")} />
      </div>
    </div>
  );
};

export default AddMusic;
