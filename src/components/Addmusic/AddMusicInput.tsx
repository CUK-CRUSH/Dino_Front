import { MusicInputDTO } from "types/Addmusic/AddMusic";
import React, { useEffect, useRef, useState } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";

export const AddMusicInput: React.FC<MusicInputDTO> = ({
  label,
  placeholder,
  value,
  required,
  onChange,
  infoButton = false,
  infoText = "",
  infoToggleHandler = () => {},
  suggestions = [],
  onSuggestionClick,
}) => {
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsSuggestionsVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    setIsSuggestionsVisible(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (onSuggestionClick) {
      onSuggestionClick(suggestion);
    }
    setIsSuggestionsVisible(false);
  };

  return (
    <div className="relative" ref={wrapperRef}>
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
        className="w-full px-2 py-4 border bg-black border-white rounded-[12px]"
        value={value}
        required={required}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === "Tab") {
            setIsSuggestionsVisible(false);
          }
        }}
      />
      {suggestions.length > 0 && isSuggestionsVisible && (
        <div className="absolute top-full w-full mt-2 text-xl rounded-[15px] py-2  bg-[#2E2E2E] z-10">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="cursor-pointer mx-2 py-[1px] rounded-[15px] hover:bg-[#545454] transition-colors duration-200"
            >
              <p className="m-1">{suggestion}</p>
            </div>
          ))}
        </div>
      )}

      {infoButton && infoText && (
        <div className="absolute -bottom-16 w-full px-2 py-3 bg-[#3B3B3B] rounded-xl">
          <p>{infoText}</p>
        </div>
      )}
    </div>
  );
};
