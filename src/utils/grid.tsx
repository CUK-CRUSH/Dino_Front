import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateGridData } from "@reducer/gridSlice";
import Modal from "@utils/modal";
import { RootState } from "@store/index";

const GridComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const urlData = useSelector((state: RootState) => state.grid);
  const dispatch = useDispatch();

  const openModal = (index: number) => {
    setIsModalOpen(true);
    setCurrentIndex(index);
  };

  const updateUrlData = (title: string, artist: string, url: string) => {
    if (currentIndex !== null && currentIndex !== undefined) {
      dispatch(updateGridData({ index: currentIndex, title, artist, url }));
    }
    setIsModalOpen(false);
  };

  return (
    <div className="flex justify-center items-center gap-2 my-20">
      <div className="grid grid-cols-2 grid-rows-2 gap-4 mt-10 text-white">
        {urlData.map((data, index) => (
          <div
            key={index}
            className="w-[160px] h-[160px] rounded-2xl border border-white"
          >
            <button onClick={() => openModal(index)}>
              새로운 플레이리스트
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && currentIndex !== null && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          urlData={urlData[currentIndex]}
          updateUrlData={updateUrlData}
        />
      )}
    </div>
  );
};

export default GridComponent;
