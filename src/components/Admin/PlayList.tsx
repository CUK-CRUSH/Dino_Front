import { useEffect, useState } from "react";
import ex from "../../assets/Admin/ex.svg"
import { Link } from "react-router-dom";
import useWindowSizeCustom from "../../hooks/useWindowSizeCustom";

export const PlayList = () => {
  const windowSize = useWindowSizeCustom();

  console.log(windowSize.width);
  const [customMargin, setCustomMargin] = useState<number>(0);

  useEffect(() => {
    if (window.innerWidth <= 390) {
      setCustomMargin((windowSize.width / 2 - 150) / 2);
    } else {
      setCustomMargin((372 / 2 - 150) / 2);
    }
  }, [windowSize.width, customMargin]);

  return (
    <div style={{ marginLeft: `${customMargin}px`, marginRight: `${customMargin}px` }}
      className="inline-block h-[150px] mt-[42px] relative">
      <Link to="13">
        <button className="w-[150px] h-[150px] rounded-[13px] font-light text-zinc-300 text-4xl">

          <img className="mx-auto w-[150px] h-full " src={ex} alt='x' />
          <div className="w-full text-left text-zinc-300 font-medium font-['Noto Sans'] absolute -bottom-10 ">

            <span className="text-[15px] align-top">Happy Mix</span>
            <span className="text-[3px] align-super ml-1">●</span>
            <span className="text-[10px] align-top">  10곡 </span>
          </div>
        </button>
      </Link>
    </div>
  );
};
