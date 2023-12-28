import { updateArtist, updateTitle, updateURL } from "@reducer/musicadd";
import { RootState } from "@store/index";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddMusic: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSave = () => {
    navigate(`/admin/1`);
  };
  const { title, artist, url } = useSelector(
    (state: RootState) => state.musicAdd
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
    <div className="z-30 h-full w-full flex flex-col bg-black text-white">
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Add Music</h2>
      </div>
      <div className="space-y-4 mx-4">
        <div>
          <h3 className="text-[15px] leading-[18px] mb-4">Title</h3>
          <input
            type="text"
            placeholder="Title"
            className="w-full p-2 border bg-black border-white  text-white rounded"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <h3 className="text-[15px] leading-[18px] mb-4">Artist</h3>
          <input
            type="text"
            placeholder="Artist"
            className="w-full p-2 border bg-black border-white  text-white rounded"
            value={artist}
            onChange={handleArtistChange}
          />
        </div>
        <div>
          <h3 className="text-[15px] leading-[18px] mb-4">URL</h3>
          <input
            type="url"
            placeholder="URL"
            className="w-full p-2 border bg-black border-white  text-white rounded"
            value={url}
            onChange={handleURLChange}
          />
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleSave}
            className="bg-white text-black w-full xl:mt-40 lg:mt-40 sm:mt-20 md:mt-20  rounded-3xl h-10"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMusic;
