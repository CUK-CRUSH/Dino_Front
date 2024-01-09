import React, { useCallback } from "react";
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

const AddMusic: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleSave = useCallback(() => {
    if (
      !url.startsWith("https://www.youtube.com/") &&
      !url.startsWith("https://youtu.be/")
    ) {
      Swal.fire({
        icon: "warning",
        title: `You can't use "${url}"`,
        text: "You have to include https://www.youtube.com/ or https://www.youtu.be/",
      });
      setTitle("");
      setArtist("");
      setURL("");
      return;
    }
    dispatch(updateTitle(title));
    dispatch(updateArtist(artist));
    dispatch(updateURL(url));
    setTitle("");
    setArtist("");
    setURL("");
    navigate(`/admin/1`); // 나중에 리다이렉트 주소 수정
  }, [navigate, url, dispatch, artist, title]);

  const handleBack = useCallback(() => {
    navigate(`/admin/1`);
  }, [navigate]);

  return (
    <div className="relative z-30 h-full w-full flex flex-col bg-black text-white py-10 text-[17px] leading-[18px]">
      <AddBackButton handleBack={handleBack} />
      <AddMusicTitle />
      <div className="space-y-8 mx-4">
        <AddMusicInput
          label="Title"
          placeholder="Title"
          value={title}
          required={true}
          onChange={handleTitleChange}
        />
        <AddMusicInput
          label="Artist"
          placeholder="Artist"
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
          infoText={
            showInformation ? "Please add the youtube link as the url." : ""
          }
          infoToggleHandler={handleInformationToggle}
        />

        <AddButton handleSave={handleSave} />
      </div>
    </div>
  );
};

export default AddMusic;
