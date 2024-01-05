import { useEffect, useState } from "react";
import plus from "../../../assets/Admin/plus.svg";
import { Link } from "react-router-dom";
import useWindowSizeCustom from "../../../hooks/useWindowSizeCustom";

export const AddPlayList = () => {
  const {windowSize, isMobile} = useWindowSizeCustom();

  console.log(windowSize.width);
  const [customMargin, setCustomMargin] = useState<number>(0);

  useEffect(() => {
    if(!isMobile){
      setCustomMargin((371 / 2 - 150) / 2);
    }
    else if(isMobile){
      if(windowSize.width >= 390 ) {setCustomMargin((390/2 - 150) /2)}
      else {setCustomMargin((windowSize.width / 2 - 150) / 2)};
    }

  }, [windowSize.width, customMargin]);

  return (
    <div style={{ marginLeft: `${customMargin}px`, marginRight: `${customMargin}px` }} className="inline-block h-[150px] mt-[42px] relative">
  <Link to="13" style={{ textDecoration: 'none' }}>
    <button className="w-[150px] h-[150px] rounded-[13px] border-2 border-zinc-300 font-light text-zinc-300 text-4xl ">

      <img className="mx-auto mb-[20px] w-[55px] h-[55px]" src={plus} alt="Plus Icon" />

      <div className="absolute bottom-0 left-0 right-0 h-[47.5px] text-center text-zinc-300 text-[13px] font-medium font-['Noto Sans']">
        New PlayList
      </div>

    </button>
  </Link>
</div>
  );
};
