import React, { useCallback } from "react";
import { updateArtist, updateTitle, updateURL } from "@reducer/musicadd";
import { RootState } from "@store/index";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleShowInformation } from "@reducer/toggle/addMusicToggle";
import { InputComponent } from "@components/Addmusic/AddMusicInput";
import Swal from "sweetalert2";

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

  return (
    <div className="z-30 h-full w-full flex flex-col bg-black text-white py-10 text-[17px] leading-[18px]">
      <div className="text-center py-20">
        <h2 className="text-[27px] font-bold mb-4 ">Add Music</h2>
      </div>
      <div className="space-y-8 mx-4">
        <InputComponent
          label="Title"
          placeholder="Title"
          value={title}
          required={true}
          onChange={handleTitleChange}
        />
        <InputComponent
          label="Artist"
          placeholder="Artist"
          value={artist}
          required={true}
          onChange={handleArtistChange}
        />
        <InputComponent
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
        {/* URL은 "https://www.youtube.com/"를 무조건 포함해야 Add되도록 제한을 걸어놓는다. */}
        <div className="flex justify-center">
          <button
            onClick={handleSave}
            className="bg-white font-bold text-black text-[19px] w-[360px] h-[58px] smartPhoneXs:mt-10 smartPhone:mt-20 tablet:mt-32 mt-40 rounded-3xl"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMusic;
