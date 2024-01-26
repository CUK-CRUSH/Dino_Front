import { MusicDataRowContentProps } from "types/EditplayList";
import { FaAngleRight } from "react-icons/fa6";

export const MusicDataRowContent: React.FC<MusicDataRowContentProps> = ({
  titleRef,
  artistRef,
  TitleLength,
  ArtistLength,
  musicData,
  isEditing,
  order,
}) => {
  return (
    <div className="flex flex-row items-center p-3 mb-2 h-[50px] mx-[7px] rounded-[15px] bg-[#2E2E2E]">
      <div className="ml-2 w-1/12">
        <span>{order}</span>
      </div>
      <div className="w-7/12 overflow-hidden">
        <div className="flex items-center">
          <span
            ref={titleRef}
            className={`flex-shrink-0 ${TitleLength ? "animate-marquee" : ""}`}
          >
            {musicData.title}
          </span>
        </div>
      </div>
      <div className="text-[13px] w-3/12 overflow-hidden">
        <div className="flex items-center">
          <span
            ref={artistRef}
            className={`flex-shrink-0 ${ArtistLength ? "animate-marquee" : ""}`}
          >
            {musicData.artist}
          </span>
        </div>
      </div>
      <div className={`w-1/12 pl-2 ${isEditing ? "" : "hidden"}`}>
        <button>
          <span>
            <FaAngleRight color="white" size={20} />
          </span>
        </button>
      </div>
    </div>
  );
};
