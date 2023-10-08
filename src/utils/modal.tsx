// Modal.tsx
import React, { useState } from "react";
import UrlModal from "@components/UrlModal/urlModal";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  urlData: { title: string; artist: string; url: string };
  updateUrlData: (title: string, artist: string, url: string) => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  urlData,
  updateUrlData,
}) => {
  const [isUrlModalOpen, setIsUrlModalOpen] = useState(false);

  const openUrlModal = () => {
    setIsUrlModalOpen(true);
  };
  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center z-50 text-white">
      <div className="h-full w-full flex flex-col bg-black">
        <div className="h-1/3 rounded-b-3xl bg-white">
          <div className="flex justify-between">
            <button onClick={onClose}>❌</button>
          </div>
          <p>사진 데이터를 담은 img태그가 들어옴</p>
        </div>

        <div className="h-2/3">
          <button className="text-white mb-8 mr-5" onClick={openUrlModal}>
            Open UrlModal
          </button>
          <div>
            <p>Title: {urlData.title}</p>
            <p>Artist: {urlData.artist}</p>
            <p>URL: {urlData.url}</p>
          </div>
        </div>
        {isUrlModalOpen && (
          <UrlModal
            isOpen={isUrlModalOpen}
            onClose={() => setIsUrlModalOpen(false)}
            updateUrlData={updateUrlData}
          />
        )}
      </div>
    </div>
  ) : null;
};

export default Modal;
