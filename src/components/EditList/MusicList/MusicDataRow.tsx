import { MusicDataDTO } from "types/EditplayList";
import "@styles/EditList/playList.css";

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MusicDataRowContent } from "./MusicContents";
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
    <div className="h-[60%] overflow-auto text-[17px] flex justify-center ">
      {/* 박스를 클릭하면 URL로 이동하도록 한다.(수정할때 X) */}
      <div className="w-[360px] my-10">
        {!isEditing ? (
          <Link to={musicData.url}>
            <MusicDataRowContent
              titleRef={titleRef}
              artistRef={artistRef}
              TitleLength={TitleLength}
              ArtistLength={ArtistLength}
              musicData={musicData}
              isEditing={isEditing}
            />
          </Link>
        ) : (
          <MusicDataRowContent
            titleRef={titleRef}
            artistRef={artistRef}
            TitleLength={TitleLength}
            ArtistLength={ArtistLength}
            musicData={musicData}
            isEditing={isEditing}
          />
        )}
      </div>
    </div>
  );
};
