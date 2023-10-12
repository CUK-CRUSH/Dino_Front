import AddMusic from "@components/Addmusic/addMusic";
import React, { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";

interface EditPlsyListProps {}

const EditPlsyList: React.FC<EditPlsyListProps> = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAddMusicModalOpen, setIsAddMusicModalOpen] = useState(false);
  const [selectImage, setSelectImage] = useState<File | null>(null);

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectImage(file);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 text-white">
      <div className="h-full w-full flex flex-col bg-black relative">
        <div
          className="h-1/3 rounded-b-3xl bg-white"
          onClick={() => document.getElementById("imageInput")?.click()}
        >
          {selectImage ? (
            <img
              src={URL.createObjectURL(selectImage)}
              alt="Selected"
              className="h-full w-full rounded-b-3xl flex justify-center items-center"
            />
          ) : (
            <p>클릭하여 이미지를 업로드하세요</p>
          )}
        </div>
        <input
          type="file"
          id="imageInput"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
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
