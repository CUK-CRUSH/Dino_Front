import { MusicInputDTO } from "types/Addmusic/AddMusic";
import React from "react";
import { IoInformationCircleOutline } from "react-icons/io5";

export const InputComponent: React.FC<MusicInputDTO> = ({
  label,
  placeholder,
  value,
  required,
  onChange,
  infoButton = false,
  infoText = "",
  infoToggleHandler = () => {},
}) => {
  return (
    <div className="relative">
      <div className="flex flex-row ">
        <h3 className="text-[17px] leading-[18px] mb-3 mr-1">{label}</h3>
        <div className="mt-[3px]">
          {infoButton && (
            <IoInformationCircleOutline
              onClick={infoToggleHandler}
              color="white"
              className="cursor-pointer"
            />
          )}
        </div>
      </div>
      <input
        type={infoButton ? "url" : "text"}
        placeholder={placeholder}
        className="w-full px-2 py-3 border bg-black border-white rounded-[3px]"
        value={value}
        required={required}
        onChange={onChange}
      />
      {infoButton && infoText && (
        <div className="absolute -bottom-16 w-full px-2 py-3 bg-[#3B3B3B] rounded-xl">
          <p>{infoText}</p>
        </div>
      )}
    </div>
  );
};
