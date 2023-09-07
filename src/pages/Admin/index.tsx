import React, { useState } from "react";
import GridComponent from "../../utils/grid"; // Update the path to GridComponent as needed.

const AdminPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [currentIndex, setCurrentIndex] = useState(-1); // Initialize with -1 to allow clicking the first box

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddContent = () => {
    setCurrentIndex((prevIndex) => (prevIndex < 8 ? prevIndex + 1 : 0)); // Cycle through the boxes
  };

  return (
    <div>
      <main className="my-20 text-white">
        <div className="flex flex-row mx-10 justify-between">
          <div className="w-3/12">
            <div className="text-center">
              <h2 className="text-[56px]">CRUSH ADMIN</h2>
              <p className="mb-4">Choose your Album Cover</p>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
              />
              <button onClick={handleAddContent}>Add Content</button>
            </div>
          </div>
          <div className="w-7/12">
            <div className="flex justify-center h-[110vh]">
              <div className="w-[33%] h-2/3 bg-black rounded-3xl relative">
                <div className="absolute inset-0 flex justify-center items-center z-10">
                  <div className="w-[92%] h-[95%] bg-black rounded-2xl relative">
                    <div className="flex justify-center">
                      <div className="w-24 h-24 bg-gray-200 rounded-full mt-20"></div>
                    </div>
                    <div className="text-center">
                      <p>name</p>
                      <p>description</p>
                    </div>
                    <GridComponent
                      inputValue={inputValue}
                      currentIndex={currentIndex}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
