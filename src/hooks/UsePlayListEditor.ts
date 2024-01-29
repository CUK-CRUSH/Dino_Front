import { useDispatch } from "react-redux";
import {
  updateArtist,
  updateTitle,
  updateURL,
  updateImage,
  resetIsSaved,
} from "@reducer/musicadd";
import { setIsEditing } from "@reducer/editPlayList/isEdit";
import {
  deletePlayList,
  putPlayList,
} from "@api/playlist-controller/playlistControl";
import { postMusicList } from "@api/music-controller/musicControl";
import { useNavigate } from "react-router-dom";

export const UsePlayListEditor = (
  playlists: any[],
  uploadImage: string | null,
  token: string,
  playlistName: string,
  musicData: any,
  playlistId: string | undefined,
  username: string | null
) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEditClick = () => {
    dispatch(setIsEditing(true));
  };

  const handleSaveClick = async (compressedImage: string | null) => {
    const playlist = playlists.find(
      (playlist: any) => playlist?.id === Number(playlistId)
    );

    if (playlist) {
      const id = playlist.id;

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
    dispatch(resetIsSaved());
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
    dispatch(resetIsSaved());
  };

  //플리삭제
  const handleDeleteClick = async () => {
    await deletePlayList(playlistId ?? "", token);
    navigate(`/${username}/admin`);
  };

  return {
    handleEditClick,
    handleSaveClick,
    handleCancelClick,
    handleDeleteClick,
  };
};
