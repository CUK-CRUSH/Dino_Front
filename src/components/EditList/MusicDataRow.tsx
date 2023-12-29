import { MusicDataDTO } from "types/EditplayList";
import "@styles/EditList/playList.css";
import { FaChevronRight } from "react-icons/fa";
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

  const TitleLength = titleWidth >= 205; // 텍스트 너비에 따라 애니메이션 적용 여부 결정
  const ArtistLength = artistWidth >= 88;

  return (
    <div className="h-2/3 overflow-auto">
      <div className="w-full my-10">
        <div className="flex flex-row items-center pb-1 mx-5 text-base border-b border-white">
          <div className="ml-2 w-1/12">
            <span className="inline-block truncate">id</span>
          </div>
          <div className="whitespace-nowrap w-7/12 overflow-hidden mr-2">
            <span
              ref={titleRef}
              className={`inline-block truncate overflow-hidden ${
                TitleLength ? "animate-marquee" : ""
              }`}
            >
              {musicData.title}
            </span>
          </div>
          <div className="whitespace-nowrap  w-3/12 overflow-hidden">
            <span
              ref={artistRef}
              className={`inline-block truncate overflow-hidden ${
                ArtistLength ? "animate-marquee" : ""
              }`}
            >
              {musicData.artist}
            </span>
          </div>
          {isEditing && (
            <div className="inline-block w-1/12">
              <button>
                <span className="inline-block">
                  <FaChevronRight color="white" />
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
