import "@styles/EditList/playList.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { MusicDataRowContent } from "./MusicContents";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";
import { MusicLength } from "./MusicLength";
import InfiniteScroll from "react-infinite-scroller";
import { musicListState } from "@atoms/Musics/MusicList";
import { useRecoilValue } from "recoil";
import SkeltonMusics from "@components/EditList/Skeleton/MusicSkeleton";

export interface MusicDataDTO {
  isEditing: boolean;
  fetchPlaylist: () => void;
}

export const MusicDataRow = ({ isEditing, fetchPlaylist }: MusicDataDTO) => {
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(
    null
  );
  const musicList = useRecoilValue(musicListState);
  const [width, setWidth] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const musicData = useSelector((state: RootState) => state.musicAdd);
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
      } else if (urlParams.has("si") || urlParams.has("feature")) {
        // 축약 URL
        videoId = url.split("?")[0].split("/").pop()!;
      }

      const element = elementRefs.current[index];
      if (element) {
        const youtubeElement = element.querySelector(".youtube-class-name"); // 유튜브 영상 컴포넌트를 감싸는 div 요소 선택
        if (youtubeElement) {
          youtubeElement.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }

      setSelectedVideoId(videoId);
      setSelectedVideoIndex(index);
    },
    [selectedVideoIndex]
  );
  const loadMore = useCallback(() => {
    // TODO: Implement loadMore function
  }, []);

  useEffect(() => {
    if (isEditing) {
      setSelectedVideoId(null);
      setSelectedVideoIndex(null);
    }
    const delay = 500;
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [isEditing]);
  return (
    <InfiniteScroll className="h-[50%]" pageStart={0} loadMore={loadMore}>
      <div className="h-[80%] scrollbar-hide overflow-scroll text-[17px] flex justify-center ">
        <div className="w-full mx-2 my-[40px] ">
          {isLoading ? (
            <SkeltonMusics customMargin={10} />
          ) : musicList?.data?.length > 0 ? (
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
                  isEditing={isEditing}
                  setWidth={setWidth}
                  fetchPlaylist={fetchPlaylist}
                  selectedVideoId={selectedVideoId}
                  width={width}
                  selectedVideoIndex={selectedVideoIndex}
                  index={index}
                  setSelectedVideoId={setSelectedVideoId}
                  setSelectedVideoIndex={setSelectedVideoIndex}
                />
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

          {isEditing &&
            isSaved &&
            musicData.musics &&
            musicData.musics.map((musicItem, index) => (
              <MusicDataRowContent
                key={Date.now() + index} // 고유한 키를 생성합니다.
                musicData={{
                  ...musicItem,
                  id: Date.now() + index, // 고유한 id를 부여합니다.
                }}
                order={1 + index + musicList?.data?.length}
                isEditing={isEditing}
                setWidth={setWidth}
                fetchPlaylist={fetchPlaylist}
                selectedVideoId={selectedVideoId}
                width={width}
                selectedVideoIndex={selectedVideoIndex}
                index={index}
                setSelectedVideoId={setSelectedVideoId}
                setSelectedVideoIndex={setSelectedVideoIndex}
              />
            ))}
        </div>
      </div>
      <MusicLength musicList={musicList} />
    </InfiniteScroll>
  );
};
