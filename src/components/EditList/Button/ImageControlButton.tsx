import { ImageControlButtonDTO } from "types/ImageCrop/imagecrops";

const ImageControlButton: React.FC<ImageControlButtonDTO> = ({
  onCancel,
  onSave,
}) => {
  return (
    <div className="flex justify-between m-5 text-[17px] text-white">
      <div>
        <button className="text-red-500" onClick={onCancel}>
          취소
        </button>
      </div>
      <div>
        <button onClick={onSave}>저장</button>
      </div>
    </div>
  );
};

export default ImageControlButton;
