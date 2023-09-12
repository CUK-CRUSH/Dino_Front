import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateBoxData } from "@reducer/boxData";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  input1: string;
  input2: string;
  input3: string;
  input4: string;
  input5: string;
  input6: string;
  clickedBox: number | null;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  input1,
  input2,
  input3,
  input4,
  input5,
  input6,
  clickedBox,
}) => {
  const [modalInput1, setModalInput1] = useState(input1);
  const [modalInput2, setModalInput2] = useState(input2);
  const [modalInput3, setModalInput3] = useState(input3);
  const [modalInput4, setModalInput4] = useState(input4);
  const [modalInput5, setModalInput5] = useState(input5);
  const [modalInput6, setModalInput6] = useState(input6);

  const dispatch = useDispatch();

  const handleInputChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModalInput1(e.target.value);
  };

  const handleInputChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModalInput2(e.target.value);
  };
  const handleInputChange3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModalInput3(e.target.value);
  };
  const handleInputChange4 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModalInput4(e.target.value);
  };
  const handleInputChange5 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModalInput5(e.target.value);
  };
  const handleInputChange6 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModalInput6(e.target.value);
  };

  const handleSubmit = () => {
    if (clickedBox !== null) {
      dispatch(
        updateBoxData({
          boxId: clickedBox,
          data: {
            input1: modalInput1,
            input2: modalInput2,
            input3: modalInput3,
            input4: modalInput4,
            input5: modalInput5,
            input6: modalInput6,
          },
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
        <input
          type="text"
          value={modalInput3}
          onChange={handleInputChange3}
          placeholder="Input 2"
        />
        <input
          type="text"
          value={modalInput4}
          onChange={handleInputChange4}
          placeholder="Input 2"
        />
        <input
          type="text"
          value={modalInput5}
          onChange={handleInputChange5}
          placeholder="Input 2"
        />
        <input
          type="text"
          value={modalInput6}
          onChange={handleInputChange6}
          placeholder="Input 2"
        />
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  ) : null;
};

export default Modal;
