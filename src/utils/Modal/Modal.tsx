import { EditPlaylistControls } from "@components/EditList/Button/EditPlaylistControl";
import ReactModal from "react-modal";
import { useSelector } from "react-redux";
import { UsePlayListEditor } from "@hooks/UsePlayListEditor";
import { RootState } from "@store/index";
import { CustomModalDTO } from "types/Modal/modal";

const customModalStyles: ReactModal.Styles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    height: "100%",
    zIndex: "10",
    // width: "390px",
    position: "fixed",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "150px",
    height: "80px",
    zIndex: "150",
    display: "flex",
    padding: "0px",
    justifyContent: "center",
    alignItems: "center",
    left: "58%",
    borderRadius: "10px",
    backgroundColor: "rgba(255, 255, 255)",
    overflow: "hidden",
  },
};

export default function CustomModal({
  isOpen,
  onRequestClose,
  uploadImage,
  compressedImage,
  playlists,
  fetchPlaylist,
  setPlaylistName,
}: Readonly<CustomModalDTO>) {
  const isEditing = useSelector(
    (state: RootState) => state.editPlaylistToggle.isEditing
  );
  const {
    handleEditClick,
    handleSaveClick,
    handleCancelClick,
    handleDeleteClick,
  } = UsePlayListEditor({
    playlists,
    fetchPlaylist,
    setPlaylistName,
  });

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customModalStyles}
      ariaHideApp={false}
      shouldCloseOnOverlayClick={true}
    >
      <EditPlaylistControls
        isEditing={isEditing}
        onSave={() => handleSaveClick(compressedImage)}
        onCancel={handleCancelClick}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />
    </ReactModal>
  );
}
