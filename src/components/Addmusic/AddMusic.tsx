import React from "react";
import { updateArtist, updateTitle, updateURL } from "@reducer/musicadd";
import { RootState } from "@store/index";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleShowInformation } from "@reducer/toggle/addMusicToggle";

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
        <div>
          <h3 className="text-[15px] leading-[18px] mb-3">Title</h3>
          <input
            type="text"
            placeholder="Title"
            className="w-full p-2 border bg-black border-white  rounded"
            value={title}
            required
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <h3 className="text-[15px] leading-[18px] mb-3">Artist</h3>
          <input
            type="text"
            placeholder="Artist"
            className="w-full p-2 border bg-black border-white  rounded"
            value={artist}
            required
            onChange={handleArtistChange}
          />
        </div>
        <div>
          <div className="flex flex-row ">
            <h3 className="text-[15px] leading-[18px] mb-3 mr-1 ">URL</h3>
            <IoInformationCircleOutline
              onClick={handleInformationToggle}
              color="white"
              className="cursor-pointer"
            />
          </div>
          <input
            type="url"
            placeholder="https://www.youtube.com/"
            className="w-full p-2 border bg-black border-white  rounded"
            value={url}
            required
            onChange={handleURLChange}
          />
          {showInformation && (
            <div className="p-2 mt-4 bg-[#3B3B3B] rounded-xl">
              {/* 추가 정보 내용 */}
              <p>Please add the youtube link as the url.</p>
            </div>
          )}
        </div>
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
