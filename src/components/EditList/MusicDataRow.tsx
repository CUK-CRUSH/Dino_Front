import { MusicDataDTO } from "types/EditplayList";
import "@styles/EditList/playList.css";

import { FaAngleRight } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
// Admin에서 EditList는 기본적으로
// Edit버튼을 누르기 전에 id, title, artist만을 보여준다..
// Edit 버튼을 누르면 음악의 순서 이동이 가능하고
// 개별 수정 버튼을 누르면 개별 수정이 가능하다.

export const MusicDataRow: React.FC<MusicDataDTO & { isEditing: boolean }> = ({
  musicData,
  isEditing,
}) => {
  const [titleWidth, setTitleWidth] = useState(0);
  const [artistWidth, setArtistWidth] = useState(0);
  const titleRef = useRef<HTMLSpanElement>(null);
  const artistRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (titleRef.current && artistRef.current) {
      const titleElement = titleRef.current;
      const artistElement = artistRef.current;
      const titleWidth = titleElement.getBoundingClientRect().width;
      const artistWidth = artistElement.getBoundingClientRect().width;
      setTitleWidth(titleWidth);
      setArtistWidth(artistWidth);
    }
  }, []);

  const TitleLength = titleWidth >= 195; // 텍스트 너비에 따라 애니메이션 적용 여부 결정
  const ArtistLength = artistWidth >= 80;

  return (
    <div className="h-2/3 overflow-auto text-[15px] flex justify-center ">
      <div className="w-[360px] my-10">
        <div className="flex flex-row items-center pb-2 mx-[13px] border-b border-white">
          <div className="ml-2 w-1/12">
            <span>1</span>
          </div>
          <div className="w-7/12 overflow-hidden">
            <div className="flex items-center">
              <span
                ref={titleRef}
                className={`flex-shrink-0 ${
                  TitleLength ? "animate-marquee" : ""
                }`}
              >
                {musicData.title}
              </span>
            </div>
          </div>
          <div className="text-[11px] w-3/12 overflow-hidden">
            <div className="flex items-center">
              <span
                ref={artistRef}
                className={`flex-shrink-0 ${
                  ArtistLength ? "animate-marquee" : ""
                }`}
              >
                {musicData.artist}
              </span>
            </div>
          </div>
          {isEditing && (
            <div className="w-1/12 pl-2">
              <button>
                <span>
                  <FaAngleRight color="white" size={20} />
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
