import ImageCropper from "@utils/ImageCrop/ImageCropper";
import { ShowImageDTO } from "types/EditplayList";
import { AiOutlinePicture } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";
import "@styles/EditList/playList.css";
import { deletePlayListImage } from "@api/playlist-controller/playlistControl";
import Swal from "sweetalert2";
import TrashCan from "@assets/PlayListImage/trash.svg";
import Camera from "@assets/PlayListImage/camera.svg";
import { useCallback } from "react";

const ShowImage = ({
  aspectRatio,
  onCrop,
  playlists,
  isEditing,
  playlistId,
  token,
}: ShowImageDTO) => {
  const { t } = useTranslation("Edit");

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
  const playlist = playlists.find(
    (playlist: any) => playlist?.id === Number(playlistId)
  );
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

    if (result.dismiss === Swal.DismissReason.cancel) {
      try {
        await deletePlayListImage(playlist.id, token);
      } catch (error) {
        console.log(error);
        swalButton.fire({
          title: "이미지 삭제에 실패했습니다.",
        });
      }
    }
  }, [playlist, token, swalButton]);

  const renderImage = (imageSrc: string) => (
    <img
      src={imageSrc}
      alt="Img"
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
          {playlist?.thumbnailUrl && (
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
          {t("representive_image")}
        </span>
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
    <div className="h-1/3 smartPhone:h-[28%] tabletMini:h-[20%] tablet:h-[18%] relative rounded-b-3xl bg-white ">
      {isEditing
        ? renderImageControls(reduxImage || playlist?.thumbnailUrl || null)
        : reduxImage || playlist?.thumbnailUrl
        ? renderImage(reduxImage || playlist?.thumbnailUrl || "")
        : renderNoImage()}
    </div>
  );
};

export default ShowImage;
