// ToastComponent.tsx

import { setToast } from "@reducer/Toast/toast";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

interface ToastComponentDTO {
  background: string;
  text: string;
}

const ToastComponent: React.FC<ToastComponentDTO> = ({ background, text }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(setToast(""));
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [dispatch]);

  return (
    <>
      {background === "white" && (
        <div
          className={` z-10 fixed left-1/2 transform -translate-x-1/2 bottom-10 p-4 text-[#000] bg-[#fff] rounded-2xl h-[40px] flex items-center`}
        >
          <div className="text-center text-xs">{text}</div>
        </div>
      )}
      {background === "black" && (
        <div
          className={`z-10 fixed left-1/2 transform -translate-x-1/2 bottom-20 p-4 text-[#fff] bg-[#000] bg-opacity-70 rounded-2xl h-[40px] flex items-center`}
        >
          <div className="text-center text-xs ">{text}</div>
        </div>
      )}
    </>
  );
};

export default ToastComponent;
