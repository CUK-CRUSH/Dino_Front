import { useDispatch, useSelector } from "react-redux";
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
import { setToast } from "@reducer/Toast/toast";
import { RootState } from "@store/index";
import useImageCompress from "./useImageCompress";
import { resetSelectedFile } from "@reducer/editPlayList/Image/isImageCompress";
import Swal from "sweetalert2";
import "@styles/EditList/playList.css";

interface UsePlayListEditorProps {
  playlists: any[];
  token: string;
  playlistName: string;
  musicData: any;
  playlistId: string | undefined;
  username: string | null;
}

export const UsePlayListEditor = ({
  playlists,
  token,
  playlistName,
  musicData,
  playlistId,
  username,
}: UsePlayListEditorProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedFileState = useSelector(
    (state: RootState) => state.selectedFile
  );
  const selectedFile = selectedFileState.selectedFile;
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
    const playlist = playlists.find(
      (playlist: any) => playlist?.id === Number(playlistId)
    );

    if (playlist) {
      const id = playlist.id;

      if (selectedFile) {
        const compressedFile = await compressImage(selectedFile);
        if (compressedFile) {
          try {
            const result = await readImageFile(compressedFile);
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
      if (playlistName) {
        await putPlayList(id, playlistName, null, token);
      }

      // 이미지 저장이 완료된 후에 음악 추가를 진행하도록 변경
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
        dispatch(updateImage(null));
      }
    }

    dispatch(setToast("editPlayList"));
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
    swalButton
      .fire({
        title: "노래를 삭제하시겠습니까?",
        html: "한번 삭제된 노래는 복구할 수 없습니다!",
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
            await deletePlayList(playlistId ?? "", token);
            navigate(`/${username}`);
          } catch (error) {
            console.log(error);
            swalButton.fire({
              title: "노래 삭제에 실패했습니다.",
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
