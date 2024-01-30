import { MusicDataDTO } from "types/EditplayList";
import "@styles/EditList/playList.css";
import { useState } from "react";
import { MusicDataRowContent } from "./MusicContents";
import Youtube from "react-youtube";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";
import { MusicLength } from "./MusicLength";
import InfiniteScroll from "react-infinite-scroller";

export const MusicDataRow: React.FC<MusicDataDTO> = ({
  isEditing,
  musicList,
  playlistId,
  username,
  token,
}) => {
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  const musicAdd = useSelector((state: RootState) => state.musicAdd);
  const { title, artist, url } = musicAdd;
  const { isSaved } = useSelector((state: RootState) => state.musicAdd);

  const handleVideoSelection = (url: string) => {
    let videoId = "";
    const urlParams = new URLSearchParams(url.split("?")[1]);

    if (urlParams.has("v")) {
      // 웹 버전
      videoId = urlParams.get("v")!;
    } else if (urlParams.has("si")) {
      // 축약 URL
      videoId = url.split("?")[0].split("/").pop()!;
    }

    setSelectedVideoId(videoId);
  };
  const loadMore = () => {};
  return (
    <>
      <InfiniteScroll pageStart={0} loadMore={loadMore}>
        <div className="h-[100%] scrollbar-hide overflow-auto text-[17px] flex justify-center ">
          <div className="w-full mx-2 my-[44px] ">
            {musicList?.data?.length > 0 ? (
              musicList.data.map((musicItem: any, index: number) => (
                <div
                  key={musicItem.id}
                  onClick={
                    !isEditing
                      ? () => handleVideoSelection(musicItem.url)
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
                  />
                </div>
              ))
            ) : (
              <div className="text-center flex justify-center items-center text-xl">
                {isSaved ? "" : "아직 음악이 없습니다!"}
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
              />
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
      </InfiniteScroll>
      <MusicLength musicList={musicList} />
    </>
  );
};
