import React, { useEffect, useState } from "react";

import { SetUserProfileBackgroundDTO } from "types/AdminEdit";
import garbage from "@assets/Admin/garbage.svg";

import UserImageCropper from "@utils/ImageCrop/UserImageCropper";
import camera from "../../assets/Admin/camera.svg";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setDeleteProfileBackgroundImage } from "@reducer/Admin/userProfileSlice";
import '../../styles/SweetAlert2/SweetAlert2.css'
import 'sweetalert2/dist/sweetalert2.min.css';
import { Img } from "react-image";
import Spinner from "@assets/Spinner/Spinner.svg";

const swalButton = Swal.mixin({
  customClass: {
    popup: "h-[120px] w-[250px] text-[10px] p-4 font-bold text-black rounded-2xl ",
    confirmButton: 'w-[90px] bg-white text-black border border-black rounded-full mx-2 px-4 py-2 cursor-pointer font-bold',
    cancelButton: "w-[90px]  bg-red-500 text-white rounded-full px-4 py-2 cursor-pointer ",
    title: "text-sm"
  },
  buttonsStyling: false,
});

const SetUserProfileBackground = ({ aspectRatio, onCrop, earlyImage, profileBackgroundImage }: SetUserProfileBackgroundDTO) => {
  // early 이미지는 맨처음에 받아오는 이미지 
  // compressed는 수정한 후 이미지
  const { profileBackgroundImageLoader } = useSelector((state: RootState) => state.imageLoader);

  const { deleteBackgroundImage } = useSelector(
    (state: RootState) => state.userProfile
  )

  const [isChange, setChange] = useState<boolean>(false);

  useEffect(() => {
    if (profileBackgroundImage) { setChange(true) }

  }, [profileBackgroundImage])

  const dispatch = useDispatch();

  const handleDeleteClick = () => {
    swalButton.fire({
      title: "이미지를 삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonColor: "#fff",
      cancelButtonColor: "#ea4335",
      confirmButtonText: "취소",
      cancelButtonText: "삭제",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(setDeleteProfileBackgroundImage(false));

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        dispatch(setDeleteProfileBackgroundImage(true));

        // '삭제' 버튼을 눌렀을 때 실행할 코드를 여기에 작성합니다.
        try {
        } catch (error) {
          console.log(error);
          Swal.fire({
            title: "이미지 삭제에 실패했습니다.",
            width: "250px",
            customClass: {
              title: "text-black text-[15px] font-bold",
              popup:
                "h-[150px] w-[250px] text-center text-[15px] font-bold text-black",
            },
          });
        }
      }
    });
  }

  return (
    <UserImageCropper aspectRatio={aspectRatio} onCrop={onCrop}>

      <div className="h-52 bg-black bg-opacity-70 mb-[-35px] relative cursor-pointer  ">
        {profileBackgroundImageLoader ?
        <div className="relative bg-black">
          <Img src={Spinner} alt='spinner' className="absolute" />
        </div>
          : !isChange && earlyImage ? (    // If earlyImage is available
            <div className="relative w-full h-full">
              {deleteBackgroundImage ?
                <Img className="absolute bottom-2 right-2" src={camera} alt="x" />
                :
                <>
                  <Img
                    src={earlyImage}
                    alt="User Profile"
                    loader={<img src={Spinner} alt="loading" />}

                    className="w-full h-full object-cover object-center "
                  />
                  <div className="absolute right-2 -bottom-3 z-20">
                    <Img
                      src={garbage}
                      alt="Overlay"
                      className="w-[25px] h-full "
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick();
                      }}
                    />
                  </div>
                </>
              }

            </div>
          ) : profileBackgroundImage ? (
            <div className="relative w-full h-full">
              {deleteBackgroundImage ?
                <Img className="absolute bottom-2 right-2" src={camera} alt="x" />
                :
                <>
                  <Img
                    src={profileBackgroundImage}
                    alt="User Profile"
                    loader={<img src={Spinner} alt="loading" />}
                    className="w-full h-full object-cover object-center "
                  />
                  <div className="absolute right-2 -bottom-3 z-20">
                    <Img
                      src={garbage}
                      alt="Overlay"
                      className="w-[25px] h-full"
                      loader={<img src={Spinner} alt="loading" />}

                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick();
                      }}
                    />
                  </div>
                </>
              }

            </div>
          ) : (
            // If neither earlyImage nor compressedImage is available
            <div className="h-full flex items-center justify-center text-center cursor-pointer">

              <Img className="absolute bottom-2 right-2" src={camera} alt="x" />
            </div>
          )}
      </div>
    </UserImageCropper>

  )
}

export default SetUserProfileBackground