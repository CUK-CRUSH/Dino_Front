import React, { useState } from "react";
import GridComponent from "../../utils/grid";
import { FaSearch } from "react-icons/fa";

const AdminPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [currentIndex, setCurrentIndex] = useState(-1);

  return (
    <div>
      <main className="my-10 text-white">
        <div className="flex mx-10 ">
          <div className="w-full">
            <div className="flex items-start justify-center h-[140vh]">
              <div className="w-[28%] h-2/3 bg-black border-gray-200 border-[6px] rounded-3xl relative">
                <div className="absolute inset-0 flex justify-center items-center z-10">
                  <div className="w-[90%] h-[100%] bg-black rounded-2xl relative">
                    <div className="flex justify-center">
                      <div className="w-24 h-24 bg-gray-200 rounded-full mt-20"></div>
                    </div>
                    <div className="text-center text-xl mt-2">
                      <p>name</p>
                      <p>description</p>
                    </div>
                    <GridComponent
                      inputValue={inputValue}
                      currentIndex={currentIndex}
                    />
                    {Array(9)
                      .fill("newjeans - hype boy")
                      .map((hi, index) => (
                        <div className="text-[11px]" key={index}>
                          {hi}
                        </div>
                      ))}
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
