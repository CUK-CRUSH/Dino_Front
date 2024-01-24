import { MusicDataDTO } from "types/EditplayList";
import "@styles/EditList/playList.css";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MusicDataRowContent } from "./MusicContents";

export const MusicDataRow: React.FC<MusicDataDTO> = ({
  isEditing,
  musicList,
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

  const TitleLength = titleWidth >= 185; // 텍스트 너비에 따라 애니메이션 적용 여부 결정
  const ArtistLength = artistWidth >= 80;

  return (
    <div className="h-[60%] overflow-auto text-[17px] flex justify-center ">
      <div className="w-full mx-2 my-10">
        {musicList?.data &&
          musicList.data.map((musicItem: any) =>
            !isEditing ? (
              <Link to={musicItem.url} key={musicItem.id}>
                <MusicDataRowContent
                  titleRef={titleRef}
                  artistRef={artistRef}
                  TitleLength={TitleLength}
                  ArtistLength={ArtistLength}
                  musicData={musicItem}
                  isEditing={isEditing}
                />
              </Link>
            ) : (
              <MusicDataRowContent
                key={musicItem.id}
                titleRef={titleRef}
                artistRef={artistRef}
                TitleLength={TitleLength}
                ArtistLength={ArtistLength}
                musicData={musicItem}
                isEditing={isEditing}
              />
            )
          )}
      </div>
    </div>
  );
};
