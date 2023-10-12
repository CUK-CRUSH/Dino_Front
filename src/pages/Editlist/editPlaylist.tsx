import AddMusic from "@components/Addmusic/addMusic";
import React, { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";

interface EditPlsyListProps {}

const EditPlsyList: React.FC<EditPlsyListProps> = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAddMusicModalOpen, setIsAddMusicModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // 추가적으로 저장할 수 있는 기능을 넣는다.
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleAddMusicClick = () => {
    setIsAddMusicModalOpen(true);
  };

  const handleCloseAddMusicModal = () => {
    setIsAddMusicModalOpen(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 text-white">
      <div className="h-full w-full flex flex-col bg-black relative">
        <div className="h-1/3 rounded-b-3xl bg-white">
          <p>사진 데이터를 담은 img 태그가 들어옴</p>
        </div>
        <div className="h-2/3">
          {isEditing ? (
            <div>
              <div className="flex justify-between m-2">
                <button className="text-red-500" onClick={handleSaveClick}>
                  Cancel
                </button>
                <button onClick={handleCancelClick}>Save</button>
              </div>
              <div className="absolute right-1 bottom-1">
                <button onClick={handleAddMusicClick}>
                  <AiFillPlusCircle size={56} />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-end m-2">
              <button onClick={handleEditClick}>Edit</button>
            </div>
          )}
        </div>
      </div>
      {isAddMusicModalOpen && (
        <AddMusic onClose={() => handleCloseAddMusicModal()} />
      )}
    </div>
  );
};

export default EditPlsyList;
