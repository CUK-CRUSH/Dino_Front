// UrlModal.tsx
import React, { useState } from "react";

interface UrlModalProps {
  isOpen: boolean;
  onClose: () => void;
  updateUrlData: (title: string, artist: string, url: string) => void;
}

const UrlModal: React.FC<UrlModalProps> = ({
  isOpen,
  onClose,
  updateUrlData,
}) => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [url, setUrl] = useState("");

  const handleSave = () => {
    updateUrlData(title, artist, url);
    onClose(); // Close the UrlModal after saving data
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center z-50 text-white">
      <div className="h-full w-full flex flex-col bg-black">
        <h2>음악 추가하기</h2>
        <div className="flex flex-col">
          <div>
            <p>제목</p>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <p>아티스트</p>
            <input
              type="text"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
            />
          </div>
          <div>
            <p>URL</p>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          <button className="bg-white w-2/3 text-black" onClick={handleSave}>
            등록하기
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default UrlModal;
