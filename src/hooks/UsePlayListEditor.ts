import { useDispatch } from "react-redux";
import {
  updateArtist,
  updateTitle,
  updateURL,
  updateImage,
} from "@reducer/musicadd";
import { setIsEditing } from "@reducer/editPlayList/isEdit";
import { putPlayList } from "@api/playlist-controller/playlistControl";

export const UsePlayListEditor = (
  playlists: any[],
  uploadImage: string | null,
  token: string
) => {
  const dispatch = useDispatch();

  const handleEditClick = () => {
    dispatch(setIsEditing(true));
  };

  const handleSaveClick = async (compressedImage: string | null) => {
    if (playlists.length > 0 && uploadImage) {
      const { id, playlistName } = playlists[0];
      console.log(uploadImage);
      await putPlayList(id, playlistName, uploadImage, token);
    }
    dispatch(setIsEditing(false));
    if (compressedImage) {
      dispatch(updateImage(compressedImage));
    }
  };

  const handleCancelClick = () => {
    dispatch(updateTitle(""));
    dispatch(updateArtist(""));
    dispatch(updateURL(""));
    dispatch(updateImage(null));
    dispatch(setIsEditing(false));
  };

  return {
    handleEditClick,
    handleSaveClick,
    handleCancelClick,
  };
};
