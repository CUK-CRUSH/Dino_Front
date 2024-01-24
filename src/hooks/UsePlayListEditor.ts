import { useDispatch } from "react-redux";
import {
  updateArtist,
  updateTitle,
  updateURL,
  updateImage,
} from "@reducer/musicadd";
import { setIsEditing } from "@reducer/editPlayList/isEdit";
import { putPlayList } from "@api/playlist-controller/playlistControl";
import { postMusicList } from "@api/music-controller/musicControl";

export const UsePlayListEditor = (
  playlists: any[],
  uploadImage: string | null,
  token: string,
  playlistName: string,
  musicData: any
) => {
  const dispatch = useDispatch();

  const handleEditClick = () => {
    dispatch(setIsEditing(true));
  };

  const handleSaveClick = async (compressedImage: string | null) => {
    if (playlists.length > 0) {
      const { id } = playlists[0];
      if (uploadImage) {
        await putPlayList(id, null, uploadImage, token);
      }
      if (playlistName) {
        await putPlayList(id, playlistName, null, token);
      }
      if (musicData && musicData.title && musicData.artist && musicData.url) {
        await postMusicList(
          id,
          musicData.title,
          musicData.artist,
          musicData.url,
          token
        );
        dispatch(updateTitle(""));
        dispatch(updateArtist(""));
        dispatch(updateURL(""));
      }
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
