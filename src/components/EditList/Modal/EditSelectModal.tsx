import React, { useEffect, useState } from "react";
import useWindowSizeCustom from "@hooks/useWindowSizeCustom";
import "../../../styles/EditList/editSelect.css";
import { EditModalDTO } from "types/EditplayList";
import ImageCropper from "@utils/ImageCrop/ImageCropper";

const EditSelectModal: React.FC<EditModalDTO> = ({ onClose, onCrop }) => {
  const windowSize = useWindowSizeCustom();
  // 사이즈 390 보다 크면 모달창 크기 고정
  const [size, setSize] = useState<boolean>(false);

  useEffect(() => {
    if (windowSize.width > 390) {
      setSize(true);
    } else {
      setSize(false);
    }
  }, [windowSize.width]);

  const [isOpen, setIsOpen] = useState(true);

  const close = () => {
    onClose();
  };
  const cancel = () => {
    setIsOpen(!isOpen);

    setTimeout(() => {
      close();
    }, 900);
  };
  const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    cancel();
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-30"
      onClick={closeModal}
    >
      {/* <div className="absolute inset-0 bg-gray-800 opacity-75 "></div> */}
      <div
        className={`relative ${
          size ? "w-[390px]" : "w-full"
        } h-full  bg-white rounded-t-[50px] shadow-lg
        animate-slide-${isOpen ? "in" : "out"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="z-50 flex justify-center  flex-col text-black text-center">
          <ImageCropper aspectRatio={1} onCrop={onCrop}>
            <button className="m-auto">추가</button>
          </ImageCropper>
          <button className="m-auto">삭제</button>
        </div>
      </div>
    </div>
  );
};

export default EditSelectModal;
