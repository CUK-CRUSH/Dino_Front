import { useNavigate } from "react-router-dom";
import { FaCirclePlus } from "react-icons/fa6";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userNameState } from "@atoms/Playlist/username";
import { fromButtonState } from "@atoms/Musics/locationState";

export const PlusButton: React.FC<{
  playlists: any;
}> = ({ playlists }) => {
  const navigate = useNavigate();
  const usernames = useRecoilValue(userNameState);

  const setFromButtonState = useSetRecoilState(fromButtonState);

  const handleAddMusicClick = () => {
    setFromButtonState(true);

    navigate(`/user/${usernames}/${playlists.id}/edit`);
  };
  
  return (
    <div className="flex justify-center items-center text-black">
      <button
        className="w-[191px] h-[50px] flex justify-center items-center flex-row bg-white rounded-[50px] space-x-2"
        onClick={handleAddMusicClick}
      >
        <FaCirclePlus size={32} />
        <span className="font-extrabold"> 음악 추가하기</span>
      </button>
    </div>
  );
};
