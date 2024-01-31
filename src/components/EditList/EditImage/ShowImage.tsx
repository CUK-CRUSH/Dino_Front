import React from "react";
import ImageCropper from "@utils/ImageCrop/ImageCropper";
import { ShowImageDTO } from "types/EditplayList";
import { AiOutlinePicture } from "react-icons/ai";
import { IoCameraOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";
import "@styles/EditList/playList.css";
import { deletePlayListImage } from "@api/playlist-controller/playlistControl";
import Swal from "sweetalert2";
import { FaRegTrashAlt } from "react-icons/fa";
import TrashCan from "@assets/PlayListImage/trash.svg";

const ShowImage: React.FC<ShowImageDTO> = ({
  aspectRatio,
  onCrop,
  playlists,
  isEditing,
  playlistId,
  token,
}) => {
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
  const handleDeleteImage = () => {
    swalButton
      .fire({
        title: "이미지를 삭제하시겠습니까?",
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
            await deletePlayListImage(playlist.id, token);
          } catch (error) {
            console.log(error);
            swalButton.fire({
              title: "이미지 삭제에 실패했습니다.",
            });
          }
        }
      });
  };

  return (
    <div className="h-1/3 smartPhone:h-[28%] tabletMini:h-[20%] tablet:h-[18%] relative rounded-b-3xl bg-white ">
      {isEditing ? (
        <div className="h-full w-full rounded-b-3xl object-cover relative">
          {reduxImage ? (
            <>
              <img
                src={reduxImage}
                alt="Img"
                className="h-full w-full object-cover rounded-b-3xl"
              />
              <ImageCropper aspectRatio={aspectRatio} onCrop={onCrop}>
                <button className="absolute bottom-0 right-2">
                  <IoCameraOutline size={32} color="black" />
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
          ) : playlist?.thumbnailUrl ? (
            <>
              <img
                className="h-full w-full object-cover rounded-b-3xl"
                src={playlist?.thumbnailUrl}
                alt="Img"
              />
              <ImageCropper aspectRatio={aspectRatio} onCrop={onCrop}>
                <button className="absolute bottom-0 right-2">
                  <IoCameraOutline size={32} color="black" />
                </button>
              </ImageCropper>
              <button
                className="absolute top-4 left-1/2 transform -translate-x-1/2"
                onClick={handleDeleteImage}
              >
                <img src={TrashCan} alt="Trash Can" width={23} height={23} />
              </button>
            </>
          ) : (
            // 이미지 데이터가 없을때 수정했을때
            <div className="h-full flex items-center justify-center rounded-b-3xl text-center bg-white">
              <div className="flex flex-col justify-center items-center h-full">
                <AiOutlinePicture size={29} className="text-[#8E8E8E]" />
                <span className="text-center text-[#8E8E8E] text-[17px] pt-[6px]">
                  {t("representive_image")}
                </span>
                <ImageCropper aspectRatio={aspectRatio} onCrop={onCrop}>
                  <button className="absolute bottom-0 right-2">
                    <IoCameraOutline size={32} color="black" />
                  </button>
                </ImageCropper>
              </div>
            </div>
          )}
        </div>
      ) : playlist?.thumbnailUrl ? (
        <img
          className="h-full w-full rounded-b-3xl object-cover"
          src={playlist?.thumbnailUrl}
          alt="Img"
        />
      ) : (
        <div className="h-full flex items-center justify-center rounded-b-3xl text-center bg-white">
          {reduxImage ? (
            <img
              src={reduxImage}
              alt="Img"
              className="h-full w-full object-cover rounded-b-3xl"
            />
          ) : (
            <div>
              <div className="flex flex-col justify-center items-center h-full">
                <AiOutlinePicture size={29} className="text-[#8E8E8E]" />
                <span className="text-center text-[#8E8E8E] text-[17px] pt-[6px]">
                  {t("representive_image")}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ShowImage;
