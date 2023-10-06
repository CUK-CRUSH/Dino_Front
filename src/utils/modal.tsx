import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  inputs: string[];
  clickedBox: number | null;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  inputs,
  clickedBox,
}) => {
  const [modalInputs, setModalInputs] = useState(inputs || []);

  const dispatch = useDispatch();

  useEffect(() => {
    setModalInputs(inputs);
  }, [inputs]);

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center z-50 text-white">
      <div className="h-full w-full flex flex-col bg-black ">
        <div className="h-1/3 rounded-b-3xl bg-white">
          <div className="flex justify-between">
            <button onClick={onClose}>❌</button>
          </div>
          <p>사진 데이터를 담은 img태그가 들어옴</p>
        </div>

        <div className=" h-2/3 ">
          <p>hi</p>
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
