import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import useWindowSizeCustom from "../../hooks/useWindowSizeCustom";


export const AddPalyList = () => {
  const windowSize = useWindowSizeCustom();

  console.log(windowSize.width)
  const [customMargin,setCustomMargin] = useState<number>(0);

  useEffect(()=>{
      setCustomMargin((((windowSize.width)/2-150)/2));
    
    console.log(customMargin)
    console.log(windowSize.width)
  },[windowSize.width,customMargin])
  
  return (
    <div style={{margin: `${customMargin}px`}} className="inline ">
      <Link to='13'>

        <button
          className="w-[150px] h-[150px] rounded-[13px] border-2 border-zinc-300 font-light text-zinc-300 text-4xl mt-[42px]"
        >
          +
        <div className="text-center text-zinc-300 text-[13px] font-medium font-['Noto Sans'] leading-[18px]">New PlayList</div>
      
        </button>
      </Link>
    </div>
  )
}
