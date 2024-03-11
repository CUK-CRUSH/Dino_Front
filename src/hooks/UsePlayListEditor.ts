import { useDispatch, useSelector } from "react-redux";
import {
  updateArtist,
  updateTitle,
  updateUrl,
  updateImage,
  resetIsSaved,
  clearMusic,
} from "@reducer/musicadd";
import { setIsEditing } from "@reducer/editPlayList/isEdit";
import {
  deletePlayList,
  putPlayList,
} from "@api/playlist-controller/playlistControl";
import { postMultipleMusicList } from "@api/music-controller/musicControl";
import { useNavigate } from "react-router-dom";
import { setToast } from "@reducer/Toast/toast";
import { RootState } from "@store/index";
import useImageCompress from "./useImageCompress";
import {
  resetSelectedFile,
  setSelectedFile,
} from "@reducer/editPlayList/Image/isImageCompress";
import Swal from "sweetalert2";
import "@styles/EditList/playList.css";
import { useRecoilValue } from "recoil";
import { userNameState } from "@atoms/Playlist/username";
import { playlistIdState } from "@atoms/Playlist/playlistId";
import { tokenState } from "@atoms/Playlist/token";

interface UsePlayListEditorProps {
  playlists: any;
  fetchPlaylist: () => void;
  setPlaylistName: (value: string) => void;
  uploadImage?: string | null;
}

export const UsePlayListEditor = ({
  playlists,
  fetchPlaylist,
  setPlaylistName,
  uploadImage,
}: UsePlayListEditorProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usernames = useRecoilValue(userNameState);
  const playlistId = useRecoilValue(playlistIdState);
  const token = useRecoilValue(tokenState);

  const musicData = useSelector((state: RootState) => state.musicAdd);

  const { compressImage } = useImageCompress();
  const isLoading = useSelector(
    (state: RootState) => state.selectedFile.isLoading
  );

  const swalButton = Swal.mixin({
    customClass: {
      popup: "popup", // 전체
      confirmButton: "confirmButton", // 취소
      cancelButton: "cancelButton", // 삭제
      title: "title", // 타이틀
      htmlContainer: "htmlContainer", // 내용
    },
    buttonsStyling: false,
  });

  const readImageFile = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject("File read error");
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleEditClick = () => {
    dispatch(setIsEditing(true));
  };

  const handleSaveClick = async (compressedImage: string | null) => {
    if (playlists) {
      const id = playlists.id;

      if (uploadImage) {
        const response = await fetch(uploadImage);
        const blob = await response.blob();
        const file = new File([blob], uploadImage, { type: "image/png" });
        const compressedFile = await compressImage(file);

        if (compressedFile) {
          try {
            const result = await readImageFile(compressedFile.compressedFile);
            if (!isLoading) {
              await putPlayList(id, null, result, token);
              dispatch(updateImage(result));
              dispatch(resetSelectedFile());
            }
          } catch (error) {
            console.error("Error reading file:", error);
          }
        }
      }

      // 비동기 함수들이 완료될 때까지 기다립니다.
      const playlistName = sessionStorage.getItem("playlistName");
      if (playlistName) {
        await putPlayList(id, playlistName, null, token);
      }

      // 이미지 저장이 완료된 후에 음악 추가를 진행하도록 변경

      try {
        if (musicData && musicData.musics && musicData.musics.length > 0) {
          await postMultipleMusicList(id, musicData.musics, token);
          dispatch(clearMusic());
          dispatch(updateImage(null));
        }
      } catch (error: any) {
        if (error.response && error.response.status === 400) {
          swalButton.fire({
            title: "URL 형식을 어긋났습니다.",
            html: "유튜브 영상링크가 포함된 URL을 입력해주세요.",
            showCancelButton: true,
            confirmButtonColor: "blue",
            cancelButtonColor: "#d33",
          });
        } else if (error.response && error.response.status === 500) {
          swalButton.fire({
            title: "음악 추가에 실패했습니다.",
            html: "타이틀 혹은 아티스트명은 50글자 이하만 가능합니다.",
            showCancelButton: true,
            confirmButtonColor: "blue",
            cancelButtonColor: "#d33",
          });
        }

        console.error(error);
      }
    }

    dispatch(setToast("editPlayList"));
    dispatch(setIsEditing(false));
    dispatch(resetIsSaved());
    dispatch(updateImage(null));
    sessionStorage.removeItem("playlistName");
    sessionStorage.removeItem("uploadImage");

    fetchPlaylist();
  };

  const handleCancelClick = () => {
    dispatch(updateTitle(""));
    dispatch(updateArtist(""));
    dispatch(updateUrl(""));
    dispatch(updateImage(null));
    dispatch(setSelectedFile(null));
    dispatch(setIsEditing(false));
    dispatch(resetIsSaved());
    dispatch(clearMusic());
    setPlaylistName(playlists.playlistName);
    sessionStorage.removeItem("playlistName");
    sessionStorage.removeItem("uploadImage");
  };

  //플리삭제
  const handleDeleteClick = async () => {
    swalButton
      .fire({
        title: "플레이리스트를 삭제하시겠습니까?",
        html: "한번 삭제된 플레이리스트는 복구할 수 없습니다!",
        showCancelButton: true,
        confirmButtonColor: "blue",
        cancelButtonColor: "#d33",
        confirmButtonText: "취소",
        cancelButtonText: "삭제",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          // '취소' 버튼을 눌렀을 때 실행할 코드를 여기에 작성합니다.
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // '삭제' 버튼을 눌렀을 때 실행할 코드를 여기에 작성합니다.
          try {
            await deletePlayList(String(playlistId ?? 0), token);
            navigate(`/user/${usernames}`);
          } catch (error) {
            console.log(error);
            swalButton.fire({
              title: "플리 삭제에 실패했습니다.",
              width: "250px",
            });
          }
        }
      });
  };

  return {
    handleEditClick,
    handleSaveClick,
    handleCancelClick,
    handleDeleteClick,
  };
};
