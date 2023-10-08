import React, { useState } from "react";
import UrlModal from "@components/UrlModal/urlModal";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  urlData: { title: string; artist: string; url: string }[];
  updateUrlData: (
    title: string,
    artist: string,
    url: string,
    currentIndex: number | null
  ) => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  urlData,
  updateUrlData,
}) => {
  const [isUrlModalOpen, setIsUrlModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const openUrlModal = (index: number) => {
    setIsUrlModalOpen(true);
    setCurrentIndex(index);
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
          <div>
            {urlData.map((data, index) => (
              <div
                className="flex flex-row my-6 mx-5 border-b border-white "
                key={index}
              >
                <div>
                  <button onClick={() => openUrlModal(index)}>
                    {index + 1}
                    {data.title}
                  </button>
                </div>
                <div className="ml-2">{data.artist}</div>
              </div>
            ))}
          </div>
        </div>

        {isUrlModalOpen && currentIndex !== null && (
          <UrlModal
            isOpen={isUrlModalOpen}
            onClose={() => setIsUrlModalOpen(false)}
            updateUrlData={(title, artist, url) => {
              updateUrlData(title, artist, url, currentIndex);
              setIsUrlModalOpen(false);
            }}
          />
        )}
      </div>
    </div>
  ) : null;
};

export default Modal;
