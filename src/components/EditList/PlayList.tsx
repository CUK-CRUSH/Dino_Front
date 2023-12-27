import React from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { selectImage } from "@reducer/imageSlice";
import { updateArtist, updateTitle, updateURL } from "@reducer/musicadd";
import { setIsEditing } from "@reducer/editPlayList/isEdit";
import { RootState } from "@store/index";
import { useNavigate } from "react-router-dom";
import { EditPlsyListDTO } from "types/EditplayList";
import { ImageSelector } from "@components/EditList/ImageSelector";
import { EditPlaylistControls } from "@components/EditList/EditPlaylistControl";
import { MusicDataRow } from "@components/EditList/MusicDataRow";

const PlayList: React.FC<EditPlsyListDTO> = () => {
  const isEditing = useSelector(
    (state: RootState) => state.editPlaylistToggle.isEditing
  );

  const selectedImage = useSelector(
    (state: RootState) => state.image.selectedImage
  );
  const musicData = useSelector((state: RootState) => state.musicAdd);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEditClick = () => {
    dispatch(setIsEditing(true));
  };

  const handleSaveClick = () => {
    dispatch(setIsEditing(false));
  };

  const handleCancelClick = () => {
    dispatch(updateTitle(""));
    dispatch(updateArtist(""));
    dispatch(updateURL(""));
    dispatch(setIsEditing(false));
  };

  const handleAddMusicClick = () => {
    navigate(`/admin/1/edit`);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      dispatch(selectImage(URL.createObjectURL(file)));
    }
  };

  return (
    <div className="z-30 h-full w-full flex flex-col bg-black text-white">
      <ImageSelector
        selectedImage={selectedImage || ""}
        onImageChange={handleImageChange}
      />

      <EditPlaylistControls
        isEditing={isEditing}
        onSave={handleSaveClick}
        onCancel={handleCancelClick}
        onEdit={handleEditClick}
      />

      <div className="h-2/3 overflow-auto">
        <div className="w-full my-10">
          <MusicDataRow musicData={musicData} />
        </div>
      </div>

      {isEditing && (
        <div className="absolute right-1 bottom-1">
          <button onClick={handleAddMusicClick}>
            <AiFillPlusCircle size={56} className="text-white" />
          </button>
        </div>
      )}
    </div>
  );
};

export default PlayList;
