// AddMusic.tsx
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
    <div className="z-30 h-full w-full flex flex-col bg-black text-white py-10">
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Add Music</h2>
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
        <div className="flex justify-center">
          <button
            onClick={handleSave}
            className="bg-white font-bold text-black w-full xl:mt-40 lg:mt-40 sm:mt-20 md:mt-20  rounded-3xl h-16"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMusic;
