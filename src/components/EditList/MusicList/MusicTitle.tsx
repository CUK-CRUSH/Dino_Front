import { useSelector } from "react-redux";
import { RootState } from "@store/index";

export const MusicTitle: React.FC = () => {
  const playlist = useSelector((state: RootState) => state.playlist.playlist);

  return (
    <h2 className="mt-5 ml-5 text-[25px] text-shadow-title font-bold leading-5">
      {playlist?.playlistName ?? "Loading..."}
    </h2>
  );
};
