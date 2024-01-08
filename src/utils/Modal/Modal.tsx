import { EditPlaylistControls } from "@components/EditList/Button/EditPlaylistControl";
import ReactModal from "react-modal";
import { useSelector } from "react-redux";
import { UsePlayListEditor } from "@hooks/UsePlayListEditor";
import { RootState } from "@store/index";
import { CustomModalDTO } from "types/Modal/modal";

const customModalStyles: ReactModal.Styles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    width: "100%",
    height: "100vh",
    zIndex: "10",
    position: "fixed",
    top: "0px",
    left: "0",
  },
  content: {
    width: "132px",
    height: "66px",
    zIndex: "150",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    top: "48px",
    left: "420px",
    borderRadius: "10px",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    overflow: "auto",
  },
};

export default function CustomModal({
  isOpen,
  onRequestClose,
  compressedImage,
}: Readonly<CustomModalDTO>) {
  const isEditing = useSelector(
    (state: RootState) => state.editPlaylistToggle.isEditing
  );

  const { handleEditClick, handleSaveClick, handleCancelClick } =
    UsePlayListEditor();

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customModalStyles}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={false}
    >
      <EditPlaylistControls
        isEditing={isEditing}
        onSave={() => handleSaveClick(compressedImage)}
        onCancel={handleCancelClick}
        onEdit={handleEditClick}
      />
    </ReactModal>
  );
}
