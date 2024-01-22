interface MusicTitleProps {
  playlists: any;
}

export const MusicTitle: React.FC<MusicTitleProps> = ({ playlists }) => {
  return (
    <h2 className="mt-5 ml-5 text-[25px] text-shadow-title font-bold leading-5">
      {playlists?.playlistName ?? "Loading..."}
    </h2>
  );
};
