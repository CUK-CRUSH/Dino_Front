import { EditPlayListControlsDTO } from "types/EditplayList";

export const EditPlaylistControls: React.FC<EditPlayListControlsDTO> = ({
  isEditing,
  onSave,
  onCancel,
  onEdit,
}) => {
  return (
    <div className="flex justify-between m-2">
      {isEditing ? (
        <>
          <button className="text-red-500" onClick={onCancel}>
            Cancel
          </button>
          <button onClick={onSave}>Save</button>
        </>
      ) : (
        <button onClick={onEdit}>Edit</button>
      )}
    </div>
  );
};
