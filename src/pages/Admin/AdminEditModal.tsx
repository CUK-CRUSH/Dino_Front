import AdminEdit from "@components/AdminEdit/AdminEdit";

interface AdminEditModalProps {
  onClose: () => void; // A function to close the modal
}

const AdminEditModal = ({onClose} : AdminEditModalProps) => {
  return <AdminEdit onClose={onClose}/>;
};

export default AdminEditModal;
