import { updateArtist, updateTitle, updateURL } from "@reducer/musicadd";
import { RootState } from "@store/index";
import React from "react";
import { FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

interface AddMusicProps {
  onClose: () => void;
}

const AddMusic: React.FC<AddMusicProps> = ({ onClose }) => {
  const dispatch = useDispatch();
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
    <div className="fixed top-0 left-0 right-0 flex items-center justify-center z-50">
      <div className="bg-black w-full max-w-[450px] p-6  relative z-[60]">
        <div className="bg-black w-full h-full  p-6 ">
          <button
            className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
            onClick={onClose}
          >
            <FaTimes size={18} color="red" />
          </button>
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-4">Add Music</h2>
          </div>
          <div className="space-y-4 mx-4 min-h-screen">
            <div>
              <h3 className="text-[15px] leading-[18px] mb-2">Title</h3>
              <input
                type="text"
                placeholder="Title"
                className="w-full p-2 border border-gray-400 rounded"
                value={title}
                onChange={handleTitleChange}
              />
            </div>
            <div>
              <h3 className="text-[15px] leading-[18px] mb-2">Artist</h3>
              <input
                type="text"
                placeholder="Artist"
                className="w-full p-2 border border-gray-400 rounded"
                value={artist}
                onChange={handleArtistChange}
              />
            </div>
            <div>
              <h3 className="text-[15px] leading-[18px] mb-2">URL</h3>
              <input
                type="url"
                placeholder="URL"
                className="w-full p-2 border border-gray-400 rounded"
                value={url}
                onChange={handleURLChange}
              />
            </div>
            <div className="flex justify-center">
              <button
                className="bg-white text-black w-full xl:mt-40 lg:mt-40 sm:mt-20 md:mt-20  rounded-3xl h-10"
                onClick={onClose}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMusic;
