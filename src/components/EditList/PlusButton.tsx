import { useNavigate } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";

export const PlusButton = () => {
  const navigate = useNavigate();
  const handleAddMusicClick = () => {
    navigate(`/admin/1/edit`);
  };
  return (
    <div className="absolute right-1 bottom-1">
      <button onClick={handleAddMusicClick}>
        <AiFillPlusCircle size={56} className="text-white" />
      </button>
    </div>
  );
};
