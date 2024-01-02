import { useEffect, useState } from "react";
import plus from "../../assets/Admin/plus.svg"
import { Link } from "react-router-dom";
import useWindowSizeCustom from "../../hooks/useWindowSizeCustom";

export const AddPalyList = () => {
  const windowSize = useWindowSizeCustom();

  console.log(windowSize.width);
  const [customMargin, setCustomMargin] = useState<number>(0);

  useEffect(() => {
    if (window.innerWidth <= 390) {
      setCustomMargin((windowSize.width / 2 - 150) / 2);
    } else {
      setCustomMargin((374 / 2 - 150) / 2);
    }
  }, [windowSize.width, customMargin]);

  return (
    <div style={{ margin: `${customMargin}px` }} className="inline ">
      <Link to="13">
        <button className="w-[150px] h-[150px] rounded-[13px] border-2 border-zinc-300 font-thin text-zinc-300 text-[100px] mt-[42px]">
          <img className="mx-auto my-4 " src={plus} alt='x' />
          <div className="text-center text-zinc-300 text-[13px] font-medium font-['Noto Sans'] leading-[18px]">
            New PlayList
          </div>
        </button>
      </Link>
    </div>
  );
};
