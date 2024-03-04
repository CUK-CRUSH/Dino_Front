import { EditButtonDTO } from "types/AdminEdit";
import {useTranslation} from "react-i18next";

const EditButton = ({ save, cancel, updateMemberData }: EditButtonDTO) => {
    const {t} = useTranslation("EditButton");
  return (
    <>
      <button onClick={cancel} className="text-red-600 ml-[10px]">
          {t("undo")}
        {/* Cancel */}
      </button>
      <button
        onClick={() => { if (save) save(updateMemberData) }}
        className="text-gray-800 mr-[10px]"
      >
          {t("save")}
        {/* Save */}
      </button>
    </>
  );
};

export default EditButton;
