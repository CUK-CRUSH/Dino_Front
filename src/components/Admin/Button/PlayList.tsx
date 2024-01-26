import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useWindowSizeCustom from "../../../hooks/useWindowSizeCustom";
import { getPlaylistDTO } from "types/Admin";
import Skeleton from "@components/Skeleton.tsx/Skeleton";

// 플레이리스트 조회하고 사진은 src="ex" 에 넣으면 됨

export const PlayList = ({ playlist }: { playlist: getPlaylistDTO }) => {
  const [isLoading,setIsLoding] = useState<boolean>(true);
  
  useEffect(() => {
    
    const delay = 1200; // 1.2 second
    const timeoutId = setTimeout(() => {
      setIsLoding(false);
      console.log(isLoading)
    }, delay);
  
    return () => clearTimeout(timeoutId);
    }, []); 

  const {windowSize, isMobile} = useWindowSizeCustom();

  const [customMargin, setCustomMargin] = useState<number>(0);

  useEffect(() => {
    if(!isMobile){
      setCustomMargin((371 / 2 - 150) / 2);
    }
    else if(isMobile){
      if(windowSize.width >= 390 ) {setCustomMargin((390/2 - 150) /2)}
      else {setCustomMargin((windowSize.width / 2 - 150) / 2)};
    }

  }, [windowSize.width, customMargin,isMobile]);

    return (
    <div style={{ marginLeft: `${customMargin}px`, marginRight: `${customMargin}px` }}
      className="inline-block h-[150px] mt-[42px] relative">
      {!isLoading ? 
      <Link to={`${playlist.id}`}>
      <button className="w-[150px] h-[150px] rounded-[13px] font-light text-zinc-300 text-4xl">

        {playlist.thumbnailUrl ?
         <img className="mx-auto w-[150px] h-full rounded-[13px]" src={playlist.thumbnailUrl ?? "default-image-url"} alt='x' />
         :
         <div style={{background : '#2E2E2E'}} className="mx-auto w-[150px] h-full rounded-[13px]"  />
        }
          <div className="w-full text-left text-zinc-300 font-medium font-['Noto Sans'] absolute -bottom-10 ">

            <span className="text-[15px] text-white align-top">{playlist.playlistName}</span>
            <span className="text-[3px] text-white align-super ml-1">●</span>
            <span className="text-[10px] text-white align-top">  {playlist.numberOfMusics} </span>
          </div>
        </button>
      </Link>
      :
      <Skeleton width="150px" height="150px" background="#2E2E2E"/>
      }
    </div>
  );
};
