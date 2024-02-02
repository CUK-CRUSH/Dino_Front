import { SetUserProfileImageDTO } from "types/AdminEdit";

import camera from "@assets/Admin/camera.svg";
import garbage from "@assets/Admin/garbage.svg";
import setDefaultImage from "@assets/Admin/setDefaultImage.svg";
import LoadingPage from "@utils/loading";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setDeleteProfileImage } from "@reducer/Admin/userProfileSlice";
import '../../styles/SweetAlert2/SweetAlert2.css'
import 'sweetalert2/dist/sweetalert2.min.css';
import { Img } from "react-image";
import UserImageCropper from "@utils/ImageCrop/UserImageCropper";
import Spinner from "@assets/Spinner/Spinner.svg";

const swalButton = Swal.mixin({
  customClass: {
    popup: "h-[120px] w-[250px] text-[10px] p-4 font-bold text-black rounded-2xl ",
    confirmButton: 'w-[90px] bg-white text-black border border-black rounded-full mx-2 px-4 py-2 cursor-pointer font-bold',
    cancelButton: "w-[90px]  bg-red-500 text-white rounded-full px-4 py-2 cursor-pointer ",
    title : "text-sm" 
  },
  buttonsStyling: false,
});

const SetUserProfileImage = ({ aspectRatio, onCrop, isCompressLoading, earlyImage, profileImage}: SetUserProfileImageDTO) => {
  // early 이미지는 맨처음에 받아오는 이미지 

  const {  deleteProfileImage } = useSelector(
    (state: RootState) => state.userProfile
  )

  const [isChange, setChange] = useState<boolean>(false);

  useEffect(() => {
    if (profileImage) { setChange(true) }

  }, [profileImage])

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
        dispatch(setDeleteProfileImage(false));

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        dispatch(setDeleteProfileImage(true));

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

      <div className="block w-16 h-16 mx-auto mb-2 relative cursor-pointer">
        {!isChange && earlyImage ? (
          // When there is an earlyImage
          <div className="relative w-full h-full">
            {deleteProfileImage ?
              <Img
                src={setDefaultImage}  // Update this to the correct default image URL
                alt="User Profile"
                loader={Spinner}
                className="w-full h-full object-cover object-center"
              /> :
              <Img
                src={earlyImage}
                alt="User Profile"
                loader={Spinner}
                className="w-full h-full object-cover object-center rounded-full"
              />
            }

            <div className="absolute -right-2 bottom-0 ">
              <Img
                src={garbage}
                alt="Overlay"
                loader={Spinner}
                className="w-[25px] h-full "
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteClick();
                }}
              />
            </div>
          </div>
        ) : profileImage ? (
          <div className="relative w-full h-full">
            {deleteProfileImage ?
              <Img
                src={setDefaultImage}  // Update this to the correct default image URL
                alt="User Profile"
                loader={Spinner}
                className="w-full h-full object-cover object-center"
              /> :
              <Img
                src={profileImage}
                alt="User Profile"
                loader={Spinner}
                className="w-full h-full object-cover object-center rounded-full"
              />
            }
            <div className="absolute -right-2 bottom-0 ">
              <Img
                src={garbage}
                alt="Overlay"
                className="w-[25px] h-full"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteClick();
                }}
              />
            </div>
          </div>
        ) : isCompressLoading ? (
            <LoadingPage />
          ) : (
            <>
              <div className="absolute inset-0 bg-black bg-opacity-10 rounded-full" />
              
              <Img
                src={setDefaultImage}  // Update this to the correct default image URL
                alt="User Profile"
                loader={Spinner}
                className="w-full h-full object-cover object-center"
              />
              <Img
                src={camera}
                alt="Overlay"
                className="absolute top-0 left-[20px] w-[25px] h-full opacity-50"
              />
            </>
          )}
      </div>

    </UserImageCropper>
  )
}

export default SetUserProfileImage