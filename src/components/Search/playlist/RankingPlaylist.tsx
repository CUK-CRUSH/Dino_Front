import { useNavigate } from "react-router-dom";
import { getPlaylistDTO } from "types/Admin";
import { useCustomPlaylistMargin } from "@hooks/useCustomMargin/useCustomPlaylistMargin";
import first from "@assets/Ranking/playlist/1.svg";
import second from "@assets/Ranking/playlist/2.svg";
import third from "@assets/Ranking/playlist/3.svg";
import four from "@assets/Ranking/playlist/4.svg";
import five from "@assets/Ranking/playlist/5.svg";
import six from "@assets/Ranking/playlist/6.svg";
import seven from "@assets/Ranking/playlist/7.svg";
import eight from "@assets/Ranking/playlist/8.svg";
import nine from "@assets/Ranking/playlist/9.svg";
import ten from "@assets/Ranking/playlist/10.svg";
import defaultImage from "@assets/PlayListImage/default.svg";


export const RankingPlaylistComponents = ({ playlist, fontColor,rank }: { playlist: getPlaylistDTO, fontColor?: string, rank : number }) => {
  
  const navigate = useNavigate();

  const rankedImage = [first,second,third,four,five,six,seven,eight,nine,ten];
  
  const customMargin = useCustomPlaylistMargin();

  const handleOnClick = (username: string | undefined, id: number | undefined) => {
    navigate(`/user/${username}/${id}`);
  };


  return (
    <>
      
        <div style={{ marginLeft: `${customMargin}px`, marginRight: `${customMargin}px` }}
          className="relative inline-block min-h-[200px] mt-[15px]"
          onClick={() => handleOnClick(playlist.username, playlist.id)}
        >
          <div className="w-[150px] h-[150px] rounded-[13px] font-light text-zinc-300 text-4xl cursor-pointer">
          <img src={rankedImage[rank] } alt='x' className="absolute right-0" />
            
            {playlist.thumbnailUrl ? (
              
              <img className="mx-auto w-[150px] h-full rounded-[13px]" src={playlist.thumbnailUrl} alt='x' />
              
            ) : (
              <img className="mx-auto w-[150px] h-full rounded-[13px]" src={defaultImage} alt='x' />
            )}
            <div className="w-full min-h-[50px] text-left text-zinc-300 font-medium absolute leading-6 whitespace-normal break-words">
              <span className={`text-[15px] text-[${fontColor}] align-top`}>{playlist.playlistName}</span>
              <span className={`text-[3px] text-[${fontColor}] align-top ml-1`}>●</span>
              <span className={`text-[12px] text-[${fontColor}] align-top`}>  {playlist.numberOfMusics}곡 </span>

            </div>
          </div>

        </div>
      

    </>
  );
};
