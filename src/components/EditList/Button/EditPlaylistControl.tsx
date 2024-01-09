import { EditPlayListControlsDTO } from "types/EditplayList";

export const EditPlaylistControls: React.FC<EditPlayListControlsDTO> = ({
  isEditing,
  onSave,
  onCancel,
  onEdit,
}) => {
  return (
    <div className="flex h-[5%] smartPhoneXs:h-[3.5%] smartPhone:h-[3.5%] tabletMini:h-[3%] tablet:h-[3%] items-center justify-between m-3 text-[19px]">
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
        <div className="ml-auto text-[18px] space-y-1">
          <button
            className="w-full border-b-[1px] border-[#D9D9D9]"
            onClick={onEdit}
          >
            List Edit
          </button>
          <button className="w-full">Delete Music</button>
        </div>
      )}
    </div>
  );
};
