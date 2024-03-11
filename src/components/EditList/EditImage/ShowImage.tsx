import ImageCropper from "@utils/ImageCrop/ImageCropper";
import { ShowImageDTO } from "types/EditplayList";
import { AiOutlinePicture } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store/index";
import "@styles/EditList/playList.css";
import { deletePlayListImage } from "@api/playlist-controller/playlistControl";
import Swal from "sweetalert2";
import TrashCan from "@assets/PlayListImage/trash.svg";
import Camera from "@assets/PlayListImage/camera.svg";
import { useCallback } from "react";
import { Img } from "react-image";
import Spinner from "@assets/Spinner/Spinner.svg";
import { useRecoilValue } from "recoil";
import { tokenState } from "@atoms/Playlist/token";
import { updateImage } from "@reducer/musicadd";

const ShowImage = ({
  aspectRatio,
  onCrop,
  playlists,
  isEditing,
  fetchPlaylist,
  setUploadImage,
}: ShowImageDTO) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(
    (state: RootState) => state.selectedFile.isLoading
  );

  const token = useRecoilValue(tokenState);
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

  const { image: reduxImage } = useSelector(
    (state: RootState) => state.musicAdd
  );

  const handleDeleteImage = useCallback(async () => {
    const result = await swalButton.fire({
      title: "이미지를 삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonColor: "blue",
      cancelButtonColor: "#d33",
      confirmButtonText: "취소",
      cancelButtonText: "삭제",
    });
    sessionStorage.removeItem("uploadImage");
    setUploadImage(null);

    if (result.dismiss === Swal.DismissReason.cancel) {
      try {
        await deletePlayListImage(playlists.id, token);
        fetchPlaylist();

        dispatch(updateImage(null));
      } catch (error) {
        console.log(error);
        swalButton.fire({
          title: "이미지 삭제에 실패했습니다.",
        });
      }
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [playlists, token, swalButton, fetchPlaylist]);

  const renderImage = (imageSrc: string) => (
    <Img
      src={imageSrc}
      alt="Img"
      loader={Spinner}
      className="h-full w-full object-cover rounded-b-3xl"
    />
  );
  const renderImageControls = (imageSrc: string | null) => (
    <>
      {imageSrc ? (
        <>
          {renderImage(imageSrc)}
          <ImageCropper aspectRatio={aspectRatio} onCrop={onCrop}>
            <button className="absolute bottom-2 right-3">
              <img src={Camera} alt="Camera" width={32} height={32} />
            </button>
          </ImageCropper>
          {playlists?.thumbnailUrl && (
            <button
              className="absolute top-4 left-1/2 transform -translate-x-1/2"
              onClick={handleDeleteImage}
            >
              <img src={TrashCan} alt="Trash Can" width={23} height={23} />
            </button>
          )}
        </>
      ) : (
        renderNoImage()
      )}
    </>
  );

  const renderNoImage = () => (
    <div className="h-full flex items-center justify-center rounded-b-3xl text-center bg-white">
      <div className="flex flex-col justify-center items-center h-full ">
        <AiOutlinePicture size={29} className="text-[#8E8E8E]" />
        <span className="text-center text-[#8E8E8E] text-[17px] pt-[6px]">
          {/* {t("representive_image")} */}
          대표 이미지 설정하기
        </span>{" "}
        {isEditing && (
          <ImageCropper aspectRatio={aspectRatio} onCrop={onCrop}>
            <button className="absolute bottom-2 right-3">
              <img src={Camera} alt="Camera" width={32} height={32} />
            </button>
          </ImageCropper>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-[33%] relative h-1/3 smartPhone:h-[28%] tabletMini:h-[20%] tablet:h-[18%] rounded-b-3xl bg-white ">
      {isLoading ? (
        <Img src={Spinner} alt="Spinner" />
      ) : isEditing ? (
        renderImageControls(reduxImage || playlists?.thumbnailUrl || null)
      ) : reduxImage || playlists?.thumbnailUrl ? (
        renderImage(reduxImage || playlists?.thumbnailUrl || "")
      ) : (
        renderNoImage()
      )}
    </div>
  );
};

export default ShowImage;
