import { useNavigate } from "react-router-dom";
import { FaCirclePlus } from "react-icons/fa6";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userNameState } from "@atoms/Playlist/username";
import { fromButtonState } from "@atoms/Musics/locationState";

export const PlusButton: React.FC<{
  playlists: any;
  tutorialStep?: string | null;
}> = ({ playlists, tutorialStep }) => {
  const navigate = useNavigate();
  const usernames = useRecoilValue(userNameState);

  const setFromButtonState = useSetRecoilState(fromButtonState);

  const handleAddMusicClick = () => {
    setFromButtonState(true);

    navigate(`/user/${usernames}/${playlists.id}/edit`);
  };

  return (
    <div className="flex justify-center items-center text-black">
      {tutorialStep === "list2" && (
        <>
          <div className="absolute text-[16px] w-[160px] h-[80px] -bottom-32 right-[50%] mt-1 z-20 bg-white text-black p-2 rounded-md font-bold flex items-center justify-center">
            <div className="text-start">
              <p className="mb-1">현재 플레이리스트에</p>
              <p>새로운 곡을 추가해요</p>
            </div>
          </div>
          <div className="w-6 h-6 bg-white absolute -bottom-[50px] left-[40%] z-[19] transform translate-y-[50%] rotate-45"></div>
        </>
      )}
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
