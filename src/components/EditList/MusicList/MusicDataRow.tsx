import { MusicDataDTO } from "types/EditplayList";
import "@styles/EditList/playList.css";
import { useEffect, useRef, useState } from "react";
import { MusicDataRowContent } from "./MusicContents";
import Youtube from "react-youtube";

export const MusicDataRow: React.FC<MusicDataDTO> = ({
  isEditing,
  musicList,
}) => {
  const [titleWidth, setTitleWidth] = useState(0);
  const [artistWidth, setArtistWidth] = useState(0);
  const titleRef = useRef<HTMLSpanElement>(null);
  const artistRef = useRef<HTMLSpanElement>(null);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

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

  const handleVideoSelection = (url: string) => {
    let videoId = "";
    const urlParams = new URLSearchParams(url.split("?")[1]);

    if (urlParams.has("v")) {
      // 웹 버전
      videoId = urlParams.get("v")!;
    } else if (urlParams.has("si")) {
      // 모바일 버전
      videoId = urlParams.get("si")!;
    }

    setSelectedVideoId(videoId);
  };
  console.log(selectedVideoId);
  return (
    <div className="h-[60%] scrollbar-hide overflow-auto text-[17px] flex justify-center ">
      <div className="w-full mx-2 my-[44px]">
        {musicList?.data &&
          musicList.data.map((musicItem: any, index: number) =>
            !isEditing ? (
              <div
                onClick={() => handleVideoSelection(musicItem.url)}
                key={musicItem.id}
              >
                <MusicDataRowContent
                  titleRef={titleRef}
                  artistRef={artistRef}
                  TitleLength={TitleLength}
                  ArtistLength={ArtistLength}
                  musicData={musicItem}
                  isEditing={isEditing}
                  order={index + 1}
                />
              </div>
            ) : (
              <MusicDataRowContent
                key={musicItem.id}
                titleRef={titleRef}
                artistRef={artistRef}
                TitleLength={TitleLength}
                ArtistLength={ArtistLength}
                musicData={musicItem}
                isEditing={isEditing}
                order={index + 1}
              />
            )
          )}
        {selectedVideoId && (
          <div
            className="fixed inset-0 flex items-center justify-center z-10"
            onClick={() => setSelectedVideoId(null)}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <Youtube
                videoId={selectedVideoId}
                opts={{
                  width: "390",
                  height: "300",
                  playerVars: {
                    autoplay: 1,
                    modestbranding: 1,
                  },
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
