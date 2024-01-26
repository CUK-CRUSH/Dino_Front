import { useEffect, useState } from "react";
import plus from "../../../assets/Admin/plus.svg";
import useWindowSizeCustom from "../../../hooks/useWindowSizeCustom";
import { postPlayList } from "@api/playlist-controller/playlistControl";
import { useCookies } from "react-cookie";
import React from "react";
import Skeleton from "@components/Skeleton.tsx/Skeleton";

export const AddPlayList = () => {
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

  const [cookie] = useCookies();
  let token = cookie.accessToken;
  const [title] = useState(null);
  const [titleImage] = useState(null); 
  return (
    <div style={{ marginLeft: `${customMargin}px`, marginRight: `${customMargin}px` }} className="inline-block h-[150px] mt-[42px] relative">
      {isLoading ? 
      <React.Fragment>
      <Skeleton width="150px" height="150px" background="#2E2E2E"/>
      <Skeleton width="100px" height="15px" marginTop="5px" marginRight="5px" display="inline-block" background="#2E2E2E"/>
      <Skeleton width="45px" height="15px" marginTop="5px" display="inline-block" background="#2E2E2E"/>
      </React.Fragment>

      :
      <button onClick={() => postPlayList(title,titleImage,token)} style={{background : '#2E2E2E'}} className="w-[150px] h-[150px] rounded-[13px] border-2 border-zinc-300 font-light text-zinc-300 text-4xl ">

      <img className="mx-auto mt-[0px] w-[33px] h-full" src={plus} alt="Plus Icon" />

      <div className="absolute bottom-1 left-0 right-0 text-center text-zinc-300 text-[12px] font-medium font-['Noto Sans']">
        새로운 플레이리스트
      </div>
    </button>
 
      }
</div>
  );
};
