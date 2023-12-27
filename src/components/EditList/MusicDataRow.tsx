import { MusicDataDTO } from "types/EditplayList";
import "@styles/playList.css";

export const MusicDataRow: React.FC<MusicDataDTO> = ({ musicData }) => {
  const TitleLength = musicData.title.length >= 15; // 텍스트 길이에 따라 애니메이션 적용 여부 결정
  const ArtistLength = musicData.artist.length >= 6;
  return (
    <div className="flex flex-row items-center pb-2 mx-5 text-base border-b border-white">
      <div className="block whitespace-nowrap w-1/12">
        <h3 className="truncate">id</h3>
      </div>
      <div className="relative block whitespace-nowrap w-7/12 overflow-hidden mr-2">
        <h3 className="truncate overflow-hidden">
          <span className={`block ${TitleLength ? "animate-marquee" : ""}`}>
            {musicData.title}
          </span>
        </h3>
      </div>
      <div className="relative block whitespace-nowrap  w-3/12 overflow-hidden">
        <h3 className="truncate overflow-hidden">
          <span className={`block ${ArtistLength ? "animate-marquee" : ""}`}>
            {musicData.artist}
          </span>
        </h3>
      </div>
      <div className="block whitespace-nowrap w-1/12">
        <button>▶️</button>
      </div>
    </div>
  );
};
