import React, { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { selectImage } from "@reducer/imageSlice";
import { updateArtist, updateTitle, updateURL } from "@reducer/musicadd";
import { RootState } from "@store/index";
import AddMusic from "@components/Addmusic/addMusic";

interface EditPlsyListProps {}

const EditPlsyList: React.FC<EditPlsyListProps> = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAddMusicModalOpen, setIsAddMusicModalOpen] = useState(false);
  const selectedImage = useSelector(
    (state: RootState) => state.image.selectedImage
  );
  const musicData = useSelector((state: RootState) => state.musicAdd);
  const dispatch = useDispatch();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // 추가적으로 저장할 수 있는 기능을 넣는다.
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    dispatch(updateTitle(""));
    dispatch(updateArtist(""));
    dispatch(updateURL(""));
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
      // 이미지를 Redux store에 선택한 이미지로 저장
      dispatch(selectImage(URL.createObjectURL(file)));
    }
  };

  return (
    <div className="z-30 h-full w-full flex flex-col bg-black">
      <div
        className="h-1/3 rounded-b-3xl bg-white"
        onClick={() => document.getElementById("imageInput")?.click()}
      >
        {selectedImage ? (
          <img
            src={selectedImage}
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
              <button className="text-red-500" onClick={handleCancelClick}>
                Cancel
              </button>
              <button onClick={handleSaveClick}>Save</button>
            </div>
            <div className="flex flex-row">
              <h3>Title: {musicData.title}</h3>
              <h3>Artist: {musicData.artist}</h3>
              <h3>URL: {musicData.url}</h3>
            </div>
            <div className="absolute right-1 bottom-1">
              <button onClick={handleAddMusicClick}>
                <AiFillPlusCircle size={56} />
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-end m-2">
              <button onClick={handleEditClick}>Edit</button>
            </div>
            <div className="flex flex-row">
              <h3>Title: {musicData.title}</h3>
              <h3>Artist: {musicData.artist}</h3>
              <h3>URL: {musicData.url}</h3>
            </div>
          </div>
        )}
      </div>
      {isAddMusicModalOpen && (
        <AddMusic onClose={() => handleCloseAddMusicModal()} />
      )}
    </div>
  );
};

export default EditPlsyList;
