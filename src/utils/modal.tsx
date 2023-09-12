import React, { useState, ChangeEvent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateBoxData } from "@reducer/boxData";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  inputs: string[]; // 입력 필드 배열
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

  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...modalInputs];
    newInputs[index] = value;
    setModalInputs(newInputs);
  };

  const handleSubmit = () => {
    if (clickedBox !== null) {
      dispatch(
        updateBoxData({
          boxId: clickedBox,
          data: {
            input1: modalInputs[0],
            input2: modalInputs[1],
            input3: modalInputs[2],
            input4: modalInputs[3],
            input5: modalInputs[4],
            input6: modalInputs[5],
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
        {modalInputs.map((input, index) => (
          <input
            key={index}
            type="text"
            value={input}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange(index, e.target.value)
            }
            placeholder={`Input ${index + 1}`}
          />
        ))}
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  ) : null;
};

export default Modal;
