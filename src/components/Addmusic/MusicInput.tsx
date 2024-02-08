import { MusicInputDTO } from "types/Addmusic/AddMusic";
import { MdCancel } from "react-icons/md";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { updateArtist, updateTitle, updateUrl } from "@reducer/musicadd";
import { AnyAction } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import Swal from "sweetalert2";
import "@styles/EditList/playList.css";

export const MusicInput: React.FC<MusicInputDTO> = ({
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
  const labels = useSelector((state: RootState) => state.labels);
  const swalButton = Swal.mixin({
    customClass: {
      popup: "popup", // 전체
      confirmButton: "confirmButton", // 취소
      cancelButton: "cancelButton", // 삭제
      title: "title", // 타이틀
      htmlContainer: "htmlContainer", // 내용
    },
    buttonsStyling: false,
  });

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
        swalButton.fire({
          title: "유튜브 URL을 넣어주세요",
        });
        return;
      }
      onChange({
        target: { value: text },
      } as React.ChangeEvent<HTMLInputElement>);
    } catch (e) {
      console.error(e);
    }
  }, [onChange, swalButton]);
  const handleClear = useCallback(
    (action: () => AnyAction) => {
      dispatch(action());
    },
    [dispatch]
  );

  return (
    <div className="relative" ref={wrapperRef}>
      <div className="flex flex-row ">
        <h3 className="text-[17px] leading-[18px] mb-3 mr-1">{t(label)}</h3>
      </div>
      {label === labels.title && (
        <button
          onClick={() => handleClear(() => updateTitle(""))}
          className="absolute top-[42px] right-3 text-[10px] bg-[#2E2E2E] p-1 rounded-lg"
        >
          <MdCancel size={20} color="red" />
        </button>
      )}
      {label === labels.artist && (
        <button
          onClick={() => handleClear(() => updateArtist(""))}
          className="absolute top-[42px] right-3 text-[10px] bg-[#2E2E2E] p-1 rounded-lg"
        >
          <MdCancel size={20} color="red" />
        </button>
      )}
      {label === labels.URL && (
        <>
          <button
            className="absolute -top-1 left-10 text-[10px] bg-[#2E2E2E] p-1 rounded-lg cursor-help"
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
        maxLength={50}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === "Tab" || e.key === "Escape") {
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
