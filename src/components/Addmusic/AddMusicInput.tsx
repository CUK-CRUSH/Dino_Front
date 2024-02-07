import { MusicInputDTO } from "types/Addmusic/AddMusic";
import { MdCancel } from "react-icons/md";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { updateArtist, updateTitle, updateUrl } from "@reducer/musicadd";
import { AnyAction } from "@reduxjs/toolkit";

export const AddMusicInput: React.FC<MusicInputDTO> = ({
  label,
  placeholder,
  value,
  required,
  onChange,
  suggestions = [],
  onSuggestionClick,
  type,
}) => {
  const { t } = useTranslation("AddMusic");
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

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

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e);
      setIsSuggestionsVisible(true);
    },
    [onChange]
  );

  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      if (onSuggestionClick) {
        onSuggestionClick(suggestion);
      }
      setIsSuggestionsVisible(false);
    },
    [onSuggestionClick]
  );

  const handleCopyClipBoard = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      const youtubeUrlPattern =
        /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;
      if (!youtubeUrlPattern.test(text)) {
        alert("클립보드의 내용이 유튜브 링크가 아닙니다.");
        return;
      }
      onChange({
        target: { value: text },
      } as React.ChangeEvent<HTMLInputElement>);
    } catch (e) {
      console.error(e);
    }
  }, []);
  const handleClear = useCallback(
    (action: () => AnyAction) => {
      dispatch(action());
    },
    [dispatch]
  );

  return (
    <div className="relative" ref={wrapperRef}>
      <div className="flex flex-row ">
        <h3 className="text-[17px] leading-[18px] mb-3 mr-1">{label}</h3>
      </div>
      {label === t("title") && (
        <button
          onClick={() => handleClear(() => updateTitle(""))}
          className="absolute top-[42px] right-3 text-[10px] bg-[#2E2E2E] p-1 rounded-lg"
        >
          <MdCancel size={20} color="red" />
        </button>
      )}
      {label === t("artist") && (
        <button
          onClick={() => handleClear(() => updateArtist(""))}
          className="absolute top-[42px] right-3 text-[10px] bg-[#2E2E2E] p-1 rounded-lg"
        >
          <MdCancel size={20} color="red" />
        </button>
      )}
      {label === "URL" && (
        <>
          <button
            className="absolute -top-1 left-10 text-[10px] bg-[#2E2E2E] p-1 rounded-lg"
            onClick={handleCopyClipBoard}
          >
            붙여넣기
          </button>
          <button
            onClick={() => handleClear(() => updateUrl(""))}
            className="absolute top-[42px] right-3 text-[10px] bg-[#2E2E2E] p-1 rounded-lg"
          >
            <MdCancel size={20} color="red" />
          </button>
        </>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-2 py-4 border bg-black border-white rounded-[12px]"
        value={value}
        required={required}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === "Tab" || e.keyCode === 13) {
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
    </div>
  );
};
