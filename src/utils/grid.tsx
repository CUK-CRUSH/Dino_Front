import React, { useState } from "react";
import Modal from "@utils/modal"; // Import your Modal component

interface GridComponentProps {
  inputValue: string;
  currentIndex: number;
}

const GridComponent: React.FC<GridComponentProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Create an array to store input values for each box
  const [boxInputs, setBoxInputs] = useState<
    { input1: string; input2: string }[]
  >([
    { input1: "", input2: "" },
    { input1: "", input2: "" },
    { input1: "", input2: "" },
    { input1: "", input2: "" },
  ]);

  // Track the clicked box
  const [clickedBox, setClickedBox] = useState<number | any>(null);

  const handleBoxClick = (boxId: number) => {
    // Open the modal and set the clicked box
    setIsModalOpen(true);
    setClickedBox(boxId);
  };

  const handleModalSubmit = (input1: string, input2: string) => {
    if (clickedBox !== null) {
      // Update the input values for the clicked box
      const updatedBoxInputs = [...boxInputs];
      updatedBoxInputs[clickedBox] = { input1, input2 };
      setBoxInputs(updatedBoxInputs);

      setIsModalOpen(false);
      setClickedBox(null);
    }
  };

  return (
    <div className="flex justify-center items-center gap-2 my-10">
      <div className="grid grid-cols-2 grid-rows-2 gap-4 p-4 text-black">
        {[0, 1, 2, 3].map((boxId) => (
          <div
            key={boxId}
            className="w-[175px] h-[175px] bg-gray-200 rounded-lg cursor-pointer"
            onClick={() => handleBoxClick(boxId)}
          >
            {/* Display the input values for each box */}
            <div>{boxInputs[boxId].input1}</div>
            <div>{boxInputs[boxId].input2}</div>
          </div>
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        input1={boxInputs[clickedBox]?.input1 || ""}
        input2={boxInputs[clickedBox]?.input2 || ""}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

export default GridComponent;
