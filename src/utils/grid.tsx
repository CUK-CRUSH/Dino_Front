import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Modal from "@utils/modal";

const GridComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedBox, setClickedBox] = useState<number | null>(null);

  // Redux를 사용하여 상태를 가져옵니다.
  const boxInputs = useSelector((state: RootState) => state.boxData);

  const handleBoxClick = (boxId: number) => {
    setClickedBox(boxId);
    setIsModalOpen(true);
  };

  return (
    <div className="flex justify-center items-center gap-2 my-10">
      <div className="grid grid-cols-2 grid-rows-2 gap-4 p-4 text-black">
        {boxInputs.map((box, boxId) => (
          <div
            key={boxId}
            className="w-[175px] h-[175px] bg-gray-200 rounded-lg cursor-pointer"
            onClick={() => handleBoxClick(boxId)}
          >
            <div>{box.input1}</div>
            <div>{box.input2}</div>
          </div>
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        input1={clickedBox !== null ? boxInputs[clickedBox]?.input1 || "" : ""}
        input2={clickedBox !== null ? boxInputs[clickedBox]?.input2 || "" : ""}
        input3={clickedBox !== null ? boxInputs[clickedBox]?.input3 || "" : ""}
        input4={clickedBox !== null ? boxInputs[clickedBox]?.input4 || "" : ""}
        input5={clickedBox !== null ? boxInputs[clickedBox]?.input5 || "" : ""}
        input6={clickedBox !== null ? boxInputs[clickedBox]?.input6 || "" : ""}
        clickedBox={clickedBox}
      />
    </div>
  );
};

export default GridComponent;
