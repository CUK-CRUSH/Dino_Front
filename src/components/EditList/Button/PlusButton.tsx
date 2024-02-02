import { useNavigate } from "react-router-dom";
import { FaCirclePlus } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

export const PlusButton: React.FC<{
  playlists: any[];
  username: string | null;
}> = ({ playlists, username }) => {
  const navigate = useNavigate();
  const handleAddMusicClick = () => {
    const { id } = playlists[0];
    // 플레이리스트 보다 하나 많은 id로 이동하여 데이터를 추가한다.
    // Save시 원래 id인 페이지로 이동
    navigate(`/user/${username}/${id}/edit`);
  };
  const { t } = useTranslation("Edit");
  return (
    <div className="absolute bottom-0 inset-x-0 mb-[5vh] smartPhone:mb-[15vh] tabletMini:mb-[32vh] tablet:mb-[42vh] flex items-center justify-center text-black">
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
