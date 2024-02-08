import { SetUserProfileImageDTO } from "types/AdminEdit";
import camera from "@assets/Admin/camera.svg";
import garbage from "@assets/Admin/garbage.svg";
import setDefaultImage from "@assets/Admin/setDefaultImage.svg";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@store/index";
import Swal from "sweetalert2";
import { setDeleteProfileImage } from "@reducer/Admin/userProfileSlice";
import '../../styles/SweetAlert2/SweetAlert2.css'
import 'sweetalert2/dist/sweetalert2.min.css';
import { Img } from "react-image";
import UserImageCropper from "@utils/ImageCrop/UserImageCropper";
import Spinner from "@assets/Spinner/Spinner.svg";

// Swal.mixin description
// Swal mixin for custom styling of SweetAlert2 modals
const swalButton = Swal.mixin({
  customClass: {
    popup: "h-[120px] w-[250px] text-[10px] p-4 font-bold text-black rounded-2xl ",
    confirmButton: 'w-[90px] bg-white text-black border border-black rounded-full mx-2 px-4 py-2 cursor-pointer font-bold',
    cancelButton: "w-[90px]  bg-red-500 text-white rounded-full px-4 py-2 cursor-pointer ",
    title : "text-sm" 
  },
  buttonsStyling: false,
});

const SetUserProfileImage = ({ aspectRatio, onCrop, earlyImage, profileImage }: SetUserProfileImageDTO) => {
  // early 이미지는 맨처음에 받아오는 이미지 
  // const {profileImageLoader} = useSelector((state: RootState) => state.imageLoader);
  const { deleteProfileImage } = useSelector((state: RootState) => state.userProfile);
  const [isChange, setChange] = useState(false);

  useEffect(() => {
    if (profileImage) {
      setChange(true);
    }
  }, [profileImage]);

  const dispatch = useDispatch();

  const handleDeleteClick = () => {
    swalButton.fire({
      title: "이미지를 삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonColor: "#fff",
      cancelButtonColor: "#ea4335",
      confirmButtonText: "취소",
      cancelButtonText: "삭제",
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.cancel) {
        dispatch(setDeleteProfileImage(true));
      } else if (result.isConfirmed) {
        dispatch(setDeleteProfileImage(false));
      }
    });
  };

  return (
    <UserImageCropper aspectRatio={aspectRatio} onCrop={onCrop}>
      <div className="block w-16 h-16 mx-auto mb-2 relative cursor-pointer">
        {/* {profileImageLoader  ? <Img src={Spinner} alt='spinner' /> : */}
         {!isChange && earlyImage ? (
          // When there is an earlyImage
          <div className="relative w-full h-full">
            <Img
              src={deleteProfileImage ? setDefaultImage : earlyImage}
              alt="User Profile"
              loader={<img src={Spinner} alt="loading" />}
              className={`w-full h-full object-cover object-center ${deleteProfileImage ? '' : 'rounded-full'}`}
            />
            <div className="absolute -right-2 bottom-0 ">
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
          </div>
        ) : profileImage ? (
          <div className="relative w-full h-full">
            <Img
              src={deleteProfileImage ? setDefaultImage : profileImage}
              alt="User Profile"
              loader={<img src={Spinner} alt="loading" />}
              className={`w-full h-full object-cover object-center ${deleteProfileImage ? '' : 'rounded-full'}`}
            />
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
        ) : (
          <>
            <div className="absolute inset-0 bg-black bg-opacity-10 rounded-full" />
            <Img
              src={setDefaultImage}
              alt="User Profile"
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
  );
};

export default SetUserProfileImage;