import React, { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  input1: string;
  input2: string;
  onSubmit: (input1: string, input2: string) => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  input1,
  input2,
  onSubmit,
}) => {
  const [modalInput1, setModalInput1] = useState(input1);
  const [modalInput2, setModalInput2] = useState(input2);

  const handleInputChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModalInput1(e.target.value);
  };

  const handleInputChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModalInput2(e.target.value);
  };

  const handleSubmit = () => {
    console.log("Input 1:", modalInput1);
    console.log("Input 2:", modalInput2);

    onSubmit(modalInput1, modalInput2);
    onClose();
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
