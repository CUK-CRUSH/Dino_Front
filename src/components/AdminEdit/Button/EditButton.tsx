import { EditButtonDTO } from "types/AdminEdit";

const EditButton = ({ save, cancel, updateMemberData }: EditButtonDTO) => {
  return (
    <>
      <button onClick={cancel} className="text-red-600 ml-[10px]">
        취소
        {/* Cancel */}
      </button>
      <button
        onClick={() => { if (save) save(updateMemberData) }}
        className="text-gray-800 mr-[10px]"
      >
        저장
        {/* Save */}
      </button>
    </>
  );
};

export default EditButton;
