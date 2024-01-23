import { useParams } from "react-router-dom";

interface MusicTitleProps {
  playlists: any;
}

export const MusicTitle: React.FC<MusicTitleProps> = ({ playlists }) => {
  const { playlistId } = useParams<{ playlistId: string }>();
  const playlist = playlists.find(
    (playlist: any) => playlist?.id === Number(playlistId)
  );

  return (
    <h2 className="mt-5 ml-5 text-[25px] text-shadow-title font-bold leading-5">

      {playlist ? playlist.playlistName : "UnTitled"}
    </h2>
  );
};
