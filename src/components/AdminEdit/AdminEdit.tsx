import React, { useCallback, useEffect, useState } from "react";

import useWindowSizeCustom from "@hooks/useWindowSizeCustom";
import "../../styles/Admin/style.css";
import EditButton from "@components/AdminEdit/Button/EditButton";
import SetUserProfileBackground from "@components/AdminEdit/SetUserProfileBackground";
import SetUserProfileImage from "@components/AdminEdit/SetUserProfileImage";
import SetUserProfileInfo from "@components/AdminEdit/SetUserProfileInfo";
import useImageCompress from "@hooks/useImageCompress";
import { getMemberDTO } from "types/Admin";
import { useCookies } from "react-cookie";
import {
  getMemberMe,
  getNicknameAvailable,
  updateMember,
} from "@api/member-controller/memberController";
import { UpdateMemberParams } from "types/AdminEdit";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setDeleteProfileBackgroundImage, setDeleteProfileImage, setProfileBackgroundImage, setProfileImage, setProfileIntroduction, setProfileUsername } from "@reducer/Admin/userProfileSlice";
import { RootState } from "@store/index";
import { setToast } from "@reducer/Toast/toast";
import { checkBadWord } from "@utils/checkBadWord/checkBadWord";
import ToastComponent from "@components/Toast/Toast";

interface AdminEditModalProps {
  onClose: () => void; // A function to close the modal
}

const AdminEdit: React.FC<AdminEditModalProps> = ({ onClose }) => {
  const [cookies] = useCookies();
  const token = cookies.accessToken;

  const [userData, setUserdata] = useState<getMemberDTO>();

  const dispatch = useDispatch();

  // 유효상태
  const [nicknameValidation, setNicknameValidation] = useState<boolean>(false);



  // 정보불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Call the asynchronous function and await its result
        const userDataResult = await getMemberMe(cookies.accessToken);
        setUserdata(userDataResult.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle errors appropriately
      }
    };
    fetchData();
  }, [cookies.accessToken]);

  const [input, setInput] = useState({
    username: "",
    introduction: "",
  });
  // 닉네임 체크
  const checkNickname = (nickname: string) => {
    // 숫자영어 _ . 허용
    const nicknameRegex = /^[a-zA-Z0-9._]{3,30}$/;
    if (nicknameRegex.test(nickname)) {
      if (!checkBadWord(nickname)) {
        return true;
      }
    } else if (!nicknameRegex.test(nickname)) {
      return false;
    }
  };


  const onChangeInput = async (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;

    setInput({
      ...input,
      [name]: value,
    });

    setUpdateMemberData({
      ...updateMemberData,
      [name]: value,
    });

    if (name === 'username') {

      if (value) {

        try {
          const checkNicknameBack = await getNicknameAvailable(value, token);
          if (!checkBadWord(value) && checkNickname(value) && checkNicknameBack.status === 200) {
            dispatch(setProfileUsername(value));
            setNicknameValidation(true);
            return;
          }
          else if (
            input.username === userData?.username
          ) {
            console.log(input.username, userData?.username)
            setNicknameValidation(true)
            return;
          }
          else if (
            input.username === ''
          ) {
            setNicknameValidation(true)
            return;
          }
          else if (
            !checkNickname(e.target.value) &&
            checkNicknameBack.status !== 200
          ) {
            setNicknameValidation(false);
          }
          else {
            setNicknameValidation(false);
          }
        } catch (error: any) {
          // If the status is 400, simply skip the error
          if (error.response && error.response.status === 400) {
            // 닉네임을 수정하고 같은 닉네임일때
            if (value === userData?.username) {
              setNicknameValidation(true);
              setUpdateMemberData((prevData) => ({
                ...prevData,
                username: '',
              }));
              return;
            }
            dispatch(setToast('duplicate'));
            setNicknameValidation(false);
          } else {
            console.error("Error checking nickname:", error);
          }
        }
      } else {
        setNicknameValidation(false);
        console.log('1')

      }

    } else if (name === 'introduction') {
      dispatch(setProfileIntroduction(value));
    }
  };

  // 닉네임을 변경하지 않고 저장할때
  useEffect(() => {
    if (input.username === '') {
      setNicknameValidation(true)
    }
  }, [input.username])
  // 배경화면
  const [
    uploadUserProfileBackgroundImage,
    setUploadUserProfileBackgroundImage,
  ] = useState<string | null>(null);

  const {
    isLoading: isCompressUserProfileBackgroundLoading,
  } = useImageCompress();

  const handleUploadUserProfileBackgroundImage = (image: string) =>
    setUploadUserProfileBackgroundImage(image);

  const handleCompressUserProfileBackgroundImage = useCallback(async () => {
    if (!uploadUserProfileBackgroundImage) return;

    // const imageFile = dataURItoFile(uploadUserProfileBackgroundImage);
    // const compressedUserProfileBackgroundImage =
    //   await compressUserProfileBackgroundImage(imageFile);

    // if (!compressedUserProfileBackgroundImage) return;
    // const imageUrl = URL.createObjectURL(compressedUserProfileBackgroundImage);

    // setCompressedUserProfileBackgroundImage(imageUrl);

    setUpdateMemberData((prevData) => ({
      ...prevData,
      backgroundImage: uploadUserProfileBackgroundImage,
    }));

    dispatch(setProfileBackgroundImage(uploadUserProfileBackgroundImage));

  }, [uploadUserProfileBackgroundImage, dispatch]);

  useEffect(() => {
    if (uploadUserProfileBackgroundImage) {
      handleCompressUserProfileBackgroundImage();
    }
  }, [
    uploadUserProfileBackgroundImage,
    handleCompressUserProfileBackgroundImage,
  ]);

  // 프로필사진
  const [uploadUserProfileImage, setUploadUserProfileImage] = useState<
    string | null
  >(null);

  const {
    isLoading: isCompressUserProfileLoading,
  } = useImageCompress();

  const handleUploadUserProfileImage = (image: string) =>
    setUploadUserProfileImage(image);

  const handleCompressUserProfileImage = useCallback(async () => {
    if (!uploadUserProfileImage) return;

    // const imageFile = dataURItoFile(uploadUserProfileImage);

    // const compressedUserProfileImage = await compressUserProfileImage(
    //   imageFile
    // );

    // if (!compressedUserProfileImage) return;
    // const imageUrl = URL.createObjectURL(compressedUserProfileImage);
    // setCompressedUserProfileImage(imageUrl);

    setUpdateMemberData((prevData) => ({
      ...prevData,
      profileImage: uploadUserProfileImage,
    }));

    dispatch(setProfileImage(uploadUserProfileImage));
  }, [uploadUserProfileImage, dispatch]);

  useEffect(() => {
    if (uploadUserProfileImage) {
      handleCompressUserProfileImage();
    }
  }, [uploadUserProfileImage, dispatch, handleCompressUserProfileImage]);

  // 모달닫기
  const close = () => {
    onClose(); // Close the modal without saving changes
  };

  const { windowSize } = useWindowSizeCustom();
  // 사이즈 390 보다 크면 모달창 크기 고정
  const [size, setSize] = useState<boolean>(false);

  useEffect(() => {
    if (windowSize.width > 390) {
      setSize(true);
    } else {
      setSize(false);
    }
  }, [windowSize.width]);

  // 열고닫기
  const [isOpen, setIsOpen] = useState(true);

  const cancel = () => {
    dispatch(setProfileUsername(''))
    dispatch(setProfileIntroduction(''))
    dispatch(setProfileBackgroundImage(null))
    dispatch(setProfileImage(null))
    dispatch(setDeleteProfileImage(false))
    dispatch(setDeleteProfileBackgroundImage(false))

    setIsOpen(!isOpen);
    // 애니메이션 용 타이머
    setTimeout(() => {
      close();
    }, 900);
  };

  // 초깃값
  const { username, profileImage, profileBackgroundImage, introduction, deleteProfileImage, deleteBackgroundImage } = useSelector(
    (state: RootState) => state.userProfile
  )
    console.log(deleteProfileImage)
  const [updateMemberData, setUpdateMemberData] = useState<UpdateMemberParams>({
    // 입력없을때 닉네임 통과
    username: username || '', // Use the directly obtained value
    introduction: introduction,
    profileImage: profileImage,
    backgroundImage: profileBackgroundImage,
    cookies: token,
    deleteProfileImage: deleteProfileImage,
    deleteBackgroundImage: deleteBackgroundImage,
  });

  useEffect(() => {
    if (deleteProfileImage) {
      setUpdateMemberData((prevData) => ({
        ...prevData,
        deleteProfileImage: true
         }
        )
      )
    }
    else {
      setUpdateMemberData((prevData) => ({
        ...prevData,
        deleteProfileImage: false
          }
        )
      )
    }
  }, [deleteProfileImage])

  useEffect(() => {
    if (deleteBackgroundImage) {
      setUpdateMemberData((prevData) => ({
        ...prevData,
        deleteBackgroundImage: true
         }
        )
      )
    }
    else {
      setUpdateMemberData((prevData) => ({
        ...prevData,
        deleteBackgroundImage: false
          }
        )
      )
    }
  }, [deleteBackgroundImage])


  const navigate = useNavigate();

  const handleMember = async (data: UpdateMemberParams) => {
    console.log("Saving data:", data);

    if (!nicknameValidation) {

      dispatch(setToast('nicknameValidation'))
      return;
    }

    await new Promise(resolve => setTimeout(resolve, 300));
    const code = await updateMember(data);
    console.log(code)
    if (code.status === 200) {
      dispatch(setToast('profile'));

      dispatch(setDeleteProfileImage(false))
      dispatch(setDeleteProfileBackgroundImage(false))
      navigate(`/${code.data.username}/admin`);
    }
    setIsOpen(!isOpen);
    // 애니메이션 용 타이머
    setTimeout(() => {
      close();
    }, 900);
  };
  // 토스트
  const { toast } = useSelector(
    (state: RootState) => state.toast
  );

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">

      {/* The following div creates a semi-transparent overlay background */}
      <div className="absolute inset-0 bg-gray-800 opacity-75 "></div>

      <div

        className={`relative ${size ? "w-[390px]" : "w-full"
          } h-full mt-5 bg-white rounded-t-3xl shadow-lg
        animate-slide-edit-${isOpen ? "in" : "out"}`}
      >
        {toast === 'duplicate' && <ToastComponent background="black" text="닉네임이 중복되었습니다 ! " />}

        {toast === 'nicknameValidation' && <ToastComponent background="black" text="닉네임을 수정해주세요 ! " />}

        {/* 상단 취소/저장 버튼 */}
        <div className="flex justify-between h-[50px]">
          <EditButton
            save={handleMember}
            cancel={cancel}
            updateMemberData={updateMemberData}
          />
        </div>

        {/* 배경화면 */}
        <SetUserProfileBackground
          aspectRatio={1 / 1}
          onCrop={handleUploadUserProfileBackgroundImage}
          isCompressLoading={isCompressUserProfileBackgroundLoading}
          earlyImage={userData?.profileBackgroundImage}
        />

        {/* 프로필 사진 */}
        <SetUserProfileImage
          aspectRatio={1 / 1}
          onCrop={handleUploadUserProfileImage}
          isCompressLoading={isCompressUserProfileLoading}
          earlyImage={userData?.profileImage}

        />

        {/* 유저 닉네임 */}
        <SetUserProfileInfo
          placeholder="User Name"
          maxlength={999}
          name="username"
          value={userData?.username}
          onChange={onChangeInput}
        />

        {/* 한줄소개 */}
        <SetUserProfileInfo
          placeholder="Introduction"
          maxlength={50}
          name="introduction"
          value={userData?.introduction}
          onChange={onChangeInput}
        />

      </div>
    </div>
  );
};

export default AdminEdit;


