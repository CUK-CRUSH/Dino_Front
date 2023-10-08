import React, { useState } from "react";
import Modal from "@utils/modal";

const GridComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [urlData, setUrlData] = useState({ title: "", artist: "", url: "" });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const updateUrlData = (title: string, artist: string, url: string) => {
    setUrlData({ title, artist, url });
    setIsModalOpen(false);
  };

  const gridData = [0, 1, 2, 3];

  return (
    <div className="flex justify-center items-center gap-2 my-20">
      <div className="grid grid-cols-2 grid-rows-2 gap-4 text-white">
        {gridData.map((index) => (
          <div
            key={index}
            className="w-[160px] h-[160px] rounded-2xl border border-white"
          >
            <button onClick={openModal}>새로운 플레이리스트</button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          urlData={urlData}
          updateUrlData={updateUrlData}
        />
      )}
    </div>
  );
};

export default GridComponent;
