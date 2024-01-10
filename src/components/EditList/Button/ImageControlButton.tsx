import { useTranslation } from "react-i18next";
import { ImageControlButtonDTO } from "types/ImageCrop/imagecrops";

const ImageControlButton: React.FC<ImageControlButtonDTO> = ({
  onCancel,
  onSave,
}) => {
  const { t } = useTranslation("Edit");
  return (
    <div className="flex justify-between m-5 text-[17px] text-white">
      <div>
        <button className="text-red-500" onClick={onCancel}>
          {t("cancle")}
        </button>
      </div>
      <div>
        <button onClick={onSave}>{t("save")}</button>
      </div>
    </div>
  );
};

export default ImageControlButton;
