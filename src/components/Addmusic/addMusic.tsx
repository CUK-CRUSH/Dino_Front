import React from "react";
import { FaTimes } from "react-icons/fa";

interface AddMusicProps {
  onClose: () => void;
}

const AddMusic: React.FC<AddMusicProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70 text-white">
      <div className="bg-black w-full h-full  p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
          onClick={onClose}
        >
          <FaTimes size={18} color="red" />
        </button>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-4">Add Music</h2>
        </div>
        <div className="space-y-4 mx-4">
          <div>
            <h3 className="text-[15px] leading-[18px] mb-2">Title</h3>
            <input
              type="text"
              placeholder="Title"
              className="w-full p-2 border border-gray-400 rounded"
            />
          </div>
          <div>
            <h3 className="text-[15px] leading-[18px] mb-2">Artist</h3>
            <input
              type="text"
              placeholder="Artist"
              className="w-full p-2 border border-gray-400 rounded"
            />
          </div>
          <div>
            <h3 className="text-[15px] leading-[18px] mb-2">URL</h3>
            <input
              type="url"
              placeholder="URL"
              className="w-full p-2 border border-gray-400 rounded"
            />
          </div>
          <div className="flex justify-center">
            <button className="bg-white text-black w-full mt-4 rounded-3xl h-10">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMusic;
