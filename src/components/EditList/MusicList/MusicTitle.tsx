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
    <h2 className="mt-5 ml-5 text-[25px] text-shadow-title font-bold leading-5">
      {isEditing ? (
        <input
          type="text"
          defaultValue={playlist?.playlistName}
          onChange={handleTitleChange}
          className="text-black"
        />
      ) : (
        playlist?.playlistName
      )}
    </h2>
  );
};
