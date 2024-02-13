import { playlistNameState } from "@atoms/Playlist/playlistName";
import { useRecoilState } from "recoil";

interface MusicTitleProps {
  isEditing?: boolean;
}

export const MusicTitle = ({ isEditing }: MusicTitleProps) => {
  const [playlistName, setPlaylistName] = useRecoilState(playlistNameState);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaylistName(e.target.value);
  };
  return (
    <h2 className="mt-8 my-[8px] mx-6 text-[25px] text-shadow-title font-bold leading-5">
      {isEditing ? (
        <input
          type="text"
          defaultValue={playlistName}
          onChange={handleTitleChange}
          className="w-full px-2 py-[2px] bg-black rounded-xl border-2 border-white"
        />
      ) : (
        playlistName
      )}
    </h2>
  );
};
