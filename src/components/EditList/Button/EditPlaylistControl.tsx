import { EditPlayListControlsDTO } from "types/EditplayList";

export const EditPlaylistControls: React.FC<EditPlayListControlsDTO> = ({
  isEditing,
  onSave,
  onCancel,
  onEdit,
}) => {
  return (
    <div className="flex  h-[5.666666%] items-center justify-between m-3 text-[19px]">
      {isEditing ? (
        <>
          <div>
            <button className="text-red-500" onClick={onCancel}>
              Cancel
            </button>
          </div>
          <div>
            <button onClick={onSave}>Save</button>
          </div>
        </>
      ) : (
        <div className="ml-auto text-[14px]">
          <button
            className="w-full border-b-[2px] border-black"
            onClick={onEdit}
          >
            List Edit
          </button>
          <button className="w-full">Delete List</button>
        </div>
      )}
    </div>
  );
};
