import { EditPlayListControlsDTO } from "types/EditplayList";

export const EditPlaylistControls: React.FC<EditPlayListControlsDTO> = ({
  isEditing,
  onSave,
  onCancel,
  onEdit,
}) => {
  return (
    <div className="flex justify-between m-3 text-[15px]">
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
        <div className="ml-auto ">
          <button onClick={onEdit}>Edit</button>
        </div>
      )}
    </div>
  );
};
