import React from "react";
import { updateArtist, updateTitle, updateURL } from "@reducer/musicadd";
import { RootState } from "@store/index";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleShowInformation } from "@reducer/toggle/addMusicToggle";
import { InputComponent } from "@components/Addmusic/AddMusicInput";

const AddMusic: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInformationToggle = () => {
    dispatch(toggleShowInformation());
  };

  const handleSave = () => {
    navigate(`/admin/1`);
  };
  const { title, artist, url } = useSelector(
    (state: RootState) => state.musicAdd
  );

  const { showInformation } = useSelector(
    (state: RootState) => state.addMusicInformationToggle
  );
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateTitle(e.target.value));
  };

  const handleArtistChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateArtist(e.target.value));
  };
  const handleURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateURL(e.target.value));
  };

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
          placeholder="https://www.youtube.com/"
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
            className="bg-white font-bold text-black text-[19px] w-[360px] h-[58px] mt-20 rounded-3xl"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMusic;
