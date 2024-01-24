import { useState } from "react";
import { useParams } from "react-router-dom";

interface MusicTitleProps {
  playlists: any;
  titlechange: (title: string) => void;
  isEditing?: boolean;
}

export const MusicTitle: React.FC<MusicTitleProps> = ({
  playlists,
  titlechange,
  isEditing,
}) => {
  const { playlistId } = useParams<{ playlistId: string }>();
  const playlist = playlists.find(
    (playlist: any) => playlist?.id === Number(playlistId)
  );

  const [title, setTitle] = useState(playlist ? playlist.playlistName : "");
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    titlechange(e.target.value);
  };
  return (
    <h2 className="mt-5 ml-5 text-[25px] text-shadow-title font-bold leading-5">
      {isEditing ? (
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          className="text-black"
        />
      ) : (
        playlist?.playlistName
      )}
    </h2>
  );
};
