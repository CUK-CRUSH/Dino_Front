import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useWindowSizeCustom from "../../../hooks/useWindowSizeCustom";
import { getPlaylistDTO } from "types/Admin";
import SkeltonPlaylist from "../SkeltonPlaylist";

export const PlayList = ({ playlist, fontColor, visible }: { playlist: getPlaylistDTO, fontColor?: string, visible?: boolean }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { windowSize, isMobile } = useWindowSizeCustom();
  const [customMargin, setCustomMargin] = useState<number>(0);

  const navigate = useNavigate();

  useEffect(() => {
    const delay = 500;
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      setCustomMargin((390 / 2 - 151) / 2);
    } else {
      if (windowSize.width > 400 && windowSize.width <= 429) {
        setCustomMargin((windowSize.width / 2 - 151) / 2);
      } else if (windowSize.width >= 430) {
        setCustomMargin((390 / 2 - 151) / 2);
      } else if (windowSize.width >= 390 && windowSize.width <= 400) {
        setCustomMargin((390 / 2 - 151) / 2);
      }
      else if (windowSize.width < 390) {
        setCustomMargin((windowSize.width / 2 - 151) / 2);
      }
    }
  }, [windowSize.width, isMobile]);

  const handleOnClick = (username: string | undefined, id: number | undefined) => {
    navigate(`/user/${username}/${id}`);
    window.location.reload();
  };

  return (
    <>
      {isLoading ? (
        <SkeltonPlaylist customMargin={customMargin} />
      ) : (
        <div style={{ marginLeft: `${customMargin}px`, marginRight: `${customMargin}px` }}
          className="relative inline-block min-h-[200px] mt-[10px]"
          onClick={() => handleOnClick(playlist.username, playlist.id)}
        >
            <button className="w-[150px] h-[150px]  rounded-[13px] font-light text-zinc-300 text-4xl ">
              {playlist.thumbnailUrl ? (
                <img className="mx-auto w-[150px] h-full rounded-[13px]" src={playlist.thumbnailUrl} alt='x' />
              ) : (
                <div className="mx-auto w-[150px] h-full rounded-[13px] bg-[#2e2e2e]" />
              )}
              <div className="w-full min-h-[50px] text-left text-zinc-300 font-medium absolute leading-6 whitespace-normal break-words">
                <span className={`text-[15px] text-[${fontColor}] align-top`}>{playlist.playlistName}</span>
                {visible ?
                  <>
                    <span className="text-[3px] text-white align-super ml-1">●</span>
                    <span className="text-[12px] text-white align-top">  {playlist.numberOfMusics} </span>
                  </>
                  : <></>
                }
              </div>
            </button>
        </div>
      )}
    </>
  );
};
