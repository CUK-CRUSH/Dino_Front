import { playlistNameState } from "@atoms/Playlist/playlistName";
import { useRecoilState } from "recoil";

interface MusicTitleProps {
  isEditing?: boolean;
  tutorialStep?: string | null;
}

export const MusicTitle = ({ isEditing, tutorialStep }: MusicTitleProps) => {
  const [playlistName, setPlaylistName] = useRecoilState(playlistNameState);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaylistName(e.target.value);
    sessionStorage.setItem("playlistName", e.target.value);
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
      {tutorialStep === "list2" && (
        <>
          <div className="absolute text-[16px] w-[300px] h-[60px] -bottom-16 right-3 mt-1 z-20 bg-white text-black p-2 rounded-md font-bold flex items-center justify-center">
            <div className="text-start">
              <p>플레이리스트의 타이틀을 수정할 수 있어요</p>
            </div>
          </div>
          <div className="w-6 h-6 bg-white absolute -bottom-1 right-[10%] z-[19] transform translate-y-[50%] rotate-45"></div>
        </>
      )}
    </h2>
  );
};
