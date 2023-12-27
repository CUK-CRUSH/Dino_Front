import { MusicDataDTO } from "types/EditplayList";

export const MusicDataRow: React.FC<MusicDataDTO> = ({ musicData }) => {
  return (
    <div className="flex flex-row items-center pb-2 mx-5 text-base border-b border-white">
      <div className="block whitespace-nowrap w-1/12">
        <h3 className="truncate">id</h3>
      </div>
      <div className="block whitespace-nowrap w-5/12">
        <h3 className="truncate">{musicData.title}</h3>
      </div>
      <div className="block whitespace-nowrap w-5/12">
        <h3 className="truncate">{musicData.artist}</h3>
      </div>
      <div className="block whitespace-nowrap w-1/12">
        <button>▶️</button>
      </div>
    </div>
  );
};
