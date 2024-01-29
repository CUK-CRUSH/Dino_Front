interface MusicTitleProps {
  playlists: any;
  titlechange: (title: string) => void;
  isEditing?: boolean;
  playlistId?: string | undefined;
}

export const MusicTitle: React.FC<MusicTitleProps> = ({
  playlists,
  titlechange,
  isEditing,
  playlistId,
}) => {
  const playlist = playlists.find(
    (playlist: any) => playlist?.id === Number(playlistId)
  );

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    titlechange(e.target.value);
  };
  return (
    <h2 className="mt-4 mx-6 text-[25px] text-shadow-title font-bold leading-5">
      {isEditing ? (
        <input
          type="text"
          defaultValue={playlist?.playlistName}
          onChange={handleTitleChange}
          className="w-full px-2 py-[2px] bg-black rounded-xl border-2 border-white"
        />
      ) : (
        playlist?.playlistName
      )}
    </h2>
  );
};
