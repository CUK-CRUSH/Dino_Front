import { useNavigate } from "react-router-dom";
import { AiFillPlusCircle } from "react-icons/ai";

export const PlusButton = () => {
  const navigate = useNavigate();
  const handleAddMusicClick = () => {
    navigate(`/admin/1/edit`);
  };
  return (
    <div className="absolute right-5 bottom-10">
      <button onClick={handleAddMusicClick}>
        <AiFillPlusCircle size={64} className="text-white" />
      </button>
    </div>
  );
};
