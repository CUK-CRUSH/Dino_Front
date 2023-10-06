// GridComponent.tsx
import React, { useState } from "react";
import Modal from "@utils/modal";

const GridComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [urlData, setUrlData] = useState({ title: "", artist: "", url: "" });

  // Function to handle opening the Modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to update urlData
  const updateUrlData = (title: string, artist: string, url: string) => {
    setUrlData({ title, artist, url });
    setIsModalOpen(false); // Close the UrlModal
  };

  return (
    <div className="flex justify-center items-center gap-2 my-20">
      <div className="grid grid-cols-2 grid-rows-2 gap-4 text-black">
        <button className="text-white" onClick={openModal}>
          Open Modal
        </button>
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
