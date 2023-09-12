import React, { useState, ChangeEvent, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateBoxData } from "@reducer/boxData";

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
            input7: modalInputs[6],
            input8: modalInputs[7],
            input9: modalInputs[8],
            input10: modalInputs[9],
            input11: modalInputs[10],
            input12: modalInputs[11],
            input13: modalInputs[12],
            input14: modalInputs[13],
            input15: modalInputs[14],
            input16: modalInputs[15],
            input17: modalInputs[16],
            input18: modalInputs[17],
            input19: modalInputs[18],
          },
        })
      );
      onClose();
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center z-50 text-white">
      <div className="bg-black p-4 rounded-lg">
        <div className="flex flex-col">
          {modalInputs.map((input, index) => (
            <div
              key={index}
              className={`flex ${index % 2 === 1 ? "mb-2" : ""}`}
            >
              <input
                type="text"
                value={input}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange(index, e.target.value)
                }
                placeholder={`Input ${index + 1}`}
                className={`mb-2`}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={onClose}>X</button>
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
