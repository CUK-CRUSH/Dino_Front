import { MusicDataDTO } from "types/EditplayList";
import "@styles/EditList/playList.css";
import { useCallback, useRef, useState } from "react";
import { MusicDataRowContent } from "./MusicContents";
import Youtube from "react-youtube";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";
import { MusicLength } from "./MusicLength";
import InfiniteScroll from "react-infinite-scroller";

export const MusicDataRow = ({
  isEditing,
  musicList,
  playlistId,
  username,
  token,
}: MusicDataDTO) => {
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(
    null
  );
  const [width, setWidth] = useState(0);

  const musicAdd = useSelector((state: RootState) => state.musicAdd);
  const { title, artist, url } = musicAdd;
  const { isSaved } = useSelector((state: RootState) => state.musicAdd);

  const elementRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleVideoSelection = useCallback(
    (url: string, index: number) => {
      if (selectedVideoIndex === index) {
        setSelectedVideoId(null);
        setSelectedVideoIndex(null);
        return;
      }
      let videoId = "";
      const urlParams = new URLSearchParams(url.split("?")[1]);

      if (urlParams.has("v")) {
        // 웹 버전
        videoId = urlParams.get("v")!;
      } else if (urlParams.has("si")) {
        // 축약 URL
        videoId = url.split("?")[0].split("/").pop()!;
      }

      const element = elementRefs.current[index];
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      setSelectedVideoId(videoId);
      setSelectedVideoIndex(index);
    },
    [selectedVideoIndex]
  );
  const loadMore = useCallback(() => {
    // TODO: Implement loadMore function
  }, []);

  return (
    <InfiniteScroll className="h-[50%]" pageStart={0} loadMore={loadMore}>
      <div className="h-[80%] scrollbar-hide overflow-scroll text-[17px] flex justify-center ">
        <div className="w-full mx-2 my-[44px] ">
          {musicList?.data?.length > 0 ? (
            musicList.data.map((musicItem: any, index: number) => (
              <div
                key={musicItem.id}
                ref={(elem) => (elementRefs.current[index] = elem)}
                onClick={
                  !isEditing
                    ? () => handleVideoSelection(musicItem.url, index)
                    : undefined
                }
              >
                <MusicDataRowContent
                  musicData={musicItem}
                  order={index + 1}
                  playlistId={playlistId}
                  username={username}
                  isEditing={isEditing}
                  token={token}
                  setWidth={setWidth}
                />
                {selectedVideoId && selectedVideoIndex === index && (
                  <Youtube
                    videoId={selectedVideoId}
                    opts={{
                      width: `${width}`,
                      height: "300",
                      playerVars: {
                        autoplay: 1,
                        modestbranding: 1,
                      },
                    }}
                  />
                )}
              </div>
            ))
          ) : (
            <div className="text-center flex justify-center items-center text-xl">
              {isSaved ? (
                ""
              ) : (
                <div
                  dangerouslySetInnerHTML={{
                    __html: "아직 음악이 없습니다!<br /> 곡을 추가해보세요!",
                  }}
                />
              )}
            </div>
          )}

          {isEditing && isSaved && musicList?.data && (
            <MusicDataRowContent
              musicData={{
                title: title,
                artist: artist,
                url: url,
                id: Date.now(),
              }}
              order={musicList.data.length + 1}
              playlistId={playlistId}
              username={username}
              isEditing={isEditing}
              token={token}
              setWidth={setWidth}
            />
          )}
        </div>
      </div>
      <MusicLength musicList={musicList} />
    </InfiniteScroll>
  );
};
