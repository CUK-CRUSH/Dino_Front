import { useNavigate } from "react-router-dom";
import { FaCirclePlus } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

export const PlusButton: React.FC<{
  playlists: any[];
  username: string | null;
  playlistId: string | undefined;
}> = ({ playlists, username, playlistId }) => {
  const navigate = useNavigate();
  const handleAddMusicClick = () => {
    const currentPlaylist = playlists.find(
      (pl: any) => pl?.id === Number(playlistId)
    );

    if (currentPlaylist) {
      navigate(`/user/${username}/${currentPlaylist.id}/edit`);
    }
  };
  const { t } = useTranslation("Edit");
  return (
    <div className="flex justify-center items-center h-screen text-black">
      <button
        className="w-[191px] h-[50px] flex justify-center items-center flex-row bg-white rounded-[50px] space-x-2"
        onClick={handleAddMusicClick}
      >
        <FaCirclePlus size={32} />
        <span className="font-extrabold"> {t("plus_music")}</span>
      </button>
    </div>
  );
};
