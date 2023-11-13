import React, { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { selectImage } from "@reducer/imageSlice";
import { updateArtist, updateTitle, updateURL } from "@reducer/musicadd";
import { RootState } from "@store/index";
import AddMusic from "@components/Addmusic/addMusic";
import { Link } from "react-router-dom";

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
    <div className="z-30 h-full w-full flex flex-col bg-black text-white">
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
          <p className="h-full flex justify-center items-end">
            Please upload a background photo!
          </p>
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
            <div className="w-full text-lg mt-10 flex flex-col justify-around">
              <div className="flex flex-row justify-around pb-2 mx-5 border-b border-white">
                <div className="flex flex-row items-center mr-20">
                  <h3 className="mr-10">1</h3>
                  <h3>{musicData.title}</h3>
                </div>
                <div className="flex flex-row items-center ml-20">
                  <h3 className="mr-2">{musicData.artist}</h3>
                  <button className="ml-10">▶️</button>
                </div>
              </div>
            </div>

            <div className="absolute right-1 bottom-1">
              <button onClick={handleAddMusicClick}>
                <AiFillPlusCircle size={56} color="white" />
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-end m-2">
              <button onClick={handleEditClick}>Edit</button>
            </div>
            {/* 나중에 maping해서 데이터 보여주기 */}

            <div className="w-full text-lg mt-10 flex flex-col justify-around">
              <div className="flex flex-row justify-around pb-2 mx-5 border-b border-white">
                <div className="flex flex-row items-center mr-20">
                  <h3 className="mr-10">1</h3>
                  <a href={musicData.url}>
                    <h3>{musicData.title}</h3>
                  </a>
                </div>
                <div className="flex flex-row items-center ml-20">
                  <h3 className="mr-2">{musicData.artist}</h3>
                  <button className="ml-10">▶️</button>
                </div>
              </div>
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
