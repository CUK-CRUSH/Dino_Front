import { EditButtonDTO } from "types/AdminEdit";

const EditButton = ({ save, cancel, updateMemberData }: EditButtonDTO) => {
  return (
    <>
      <button onClick={cancel} className="text-red-600 ml-[10px]">
        Cancel
      </button>
      <button
        onClick={() => save(updateMemberData)}
        className="text-gray-800 mr-[10px]"
      >
        Save
      </button>
    </>
  );
};

export default EditButton;
