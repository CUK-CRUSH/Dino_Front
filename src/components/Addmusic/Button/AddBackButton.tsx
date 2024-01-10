import React from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { AddMusicBackButtonDTO } from "types/Addmusic/AddMusic";

const AddBackButton: React.FC<AddMusicBackButtonDTO> = ({ handleBack }) => {
  return (
    <button className="absolute left-3" onClick={handleBack}>
      <FaAngleLeft color="white" size={24} />
    </button>
  );
};

export default AddBackButton;
