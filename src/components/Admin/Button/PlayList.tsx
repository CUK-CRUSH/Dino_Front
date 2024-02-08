import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useWindowSizeCustom from "../../../hooks/useWindowSizeCustom";
import { getPlaylistDTO } from "types/Admin";
import SkeltonPlaylist from "../SkeltonPlaylist";

export const PlayList = ({ playlist }: { playlist: getPlaylistDTO }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { windowSize, isMobile } = useWindowSizeCustom();
  const [customMargin, setCustomMargin] = useState<number>(0);

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
      } else if (windowSize.width >= 390 && windowSize.width <= 400 ) {
        setCustomMargin((390 / 2 - 151) / 2);
      }
      else if (windowSize.width < 390) {
        setCustomMargin((windowSize.width / 2 - 151) / 2);
      }
    }
  }, [windowSize.width, isMobile]);

  return (
    <>
      {isLoading ? (
        <SkeltonPlaylist customMargin={customMargin} />
      ) : (
        <div style={{ marginLeft: `${customMargin}px`, marginRight: `${customMargin}px` }} className="inline-block h-[150px] my-[42px] relative">
          <Link to={`${playlist.id}`}>
            <button className="w-[150px] h-[150px] rounded-[13px] font-light text-zinc-300 text-4xl">
              {playlist.thumbnailUrl ? (
                <img className="mx-auto w-[150px] h-full rounded-[13px]" src={playlist.thumbnailUrl} alt='x' />
              ) : (
                <div style={{ background: '#2E2E2E' }} className="mx-auto w-[150px] h-full rounded-[13px]" />
              )}
              <div className="w-full text-left text-zinc-300 font-medium font-['Noto Sans'] absolute -bottom-10 ">
                <span className="text-[15px] text-white align-top">{playlist.playlistName}</span>
                <span className="text-[3px] text-white align-super ml-1">●</span>
                <span className="text-[10px] text-white align-top">  {playlist.numberOfMusics} </span>
              </div>
            </button>
          </Link>
        </div>
      )}
    </>
  );
};
