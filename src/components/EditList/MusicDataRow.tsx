import { MusicDataDTO } from "types/EditplayList";
import "@styles/EditList/playList.css";

export const MusicDataRow: React.FC<MusicDataDTO> = ({ musicData }) => {
  const TitleLength = musicData.title.length >= 15; // 텍스트 길이에 따라 애니메이션 적용 여부 결정
  const ArtistLength = musicData.artist.length >= 6;
  return (
    <div className="h-2/3 overflow-auto">
      <div className="w-full my-10">
        <div className="flex flex-row items-center pb-1 mx-5 text-base border-b border-white">
          <div className="ml-2 w-1/12">
            <span className="inline-block truncate">id</span>
          </div>
          <div className="whitespace-nowrap w-7/12 overflow-hidden mr-2">
            <span
              className={`inline-block truncate overflow-hidden ${
                TitleLength ? "animate-marquee" : ""
              }`}
            >
              {musicData.title}
            </span>
          </div>
          <div className="whitespace-nowrap  w-3/12 overflow-hidden">
            <span
              className={`inline-block truncate overflow-hidden ${
                ArtistLength ? "animate-marquee" : ""
              }`}
            >
              {musicData.artist}
            </span>
          </div>
          <div className="inline-block w-1/12">
            <button>
              <span className="inline-block">▶️</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
