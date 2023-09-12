import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateBoxData } from "@reducer/boxData";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  input1: string;
  input2: string;
  clickedBox: number | null;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  input1,
  input2,
  clickedBox,
}) => {
  const [modalInput1, setModalInput1] = useState(input1);
  const [modalInput2, setModalInput2] = useState(input2);

  const dispatch = useDispatch();

  const handleInputChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModalInput1(e.target.value);
  };

  const handleInputChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModalInput2(e.target.value);
  };

  const handleSubmit = () => {
    if (clickedBox !== null) {
      dispatch(
        updateBoxData({
          boxId: clickedBox,
          data: { input1: modalInput1, input2: modalInput2 },
        })
      );
      onClose();
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center z-50 text-white">
      <div className="bg-black p-4 rounded-lg">
        <h2>Modal Title</h2>
        <input
          type="text"
          value={modalInput1}
          onChange={handleInputChange1}
          placeholder="Input 1"
        />
        <input
          type="text"
          value={modalInput2}
          onChange={handleInputChange2}
          placeholder="Input 2"
        />
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  ) : null;
};

export default Modal;
