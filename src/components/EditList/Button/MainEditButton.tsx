import CustomModal from "@utils/Modal/Modal";
import { useState } from "react";
import { FaAngleLeft, FaEllipsisVertical } from "react-icons/fa6";

export const MainEditButton: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex  h-[5.666666%] items-center justify-between m-3 text-[19px]">
      <div>
        <button className="text-red-500">
          <FaAngleLeft color="white" size={20} />
        </button>
      </div>
      <div>
        <button onClick={() => setModalOpen(true)}>
          <FaEllipsisVertical color="white" size={20} />
        </button>
      </div>
      <CustomModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        compressedImage={null}
      />
    </div>
  );
};
