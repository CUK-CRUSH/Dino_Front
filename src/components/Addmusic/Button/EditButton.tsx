import React from "react";
import { AddButtonDTO } from "types/Addmusic/AddMusic";

const EditButton: React.FC<AddButtonDTO> = ({ handleSave, plusText }) => {
  return (
    <div className="flex justify-center">
      <button
        onClick={handleSave}
        className="bg-white font-bold text-black text-[19px] w-11/12 h-[58px] smartPhoneXs:mt-10 smartPhone:mt-20 tablet:mt-32 mt-40 rounded-3xl"
      >
        {plusText}
      </button>
    </div>
  );
};

export default EditButton;
