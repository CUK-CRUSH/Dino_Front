import React, { useCallback, useEffect, useState } from "react";

import useWindowSizeCustom from "@hooks/useWindowSizeCustom";
import "../../styles/Admin/style.css";
import EditButton from "@components/AdminEdit/Button/EditButton";
import SetUserProfileBackground from "@components/AdminEdit/SetUserProfileBackground";
import SetUserProfileImage from "@components/AdminEdit/SetUserProfileImage";
import SetUserProfileInfo from "@components/AdminEdit/SetUserProfileInfo";
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
import {
  setDeleteProfileBackgroundImage,
  setDeleteProfileImage,
  setProfileIntroduction,
  setProfileUsername,
} from "@reducer/Admin/userProfileSlice";
import { RootState } from "@store/index";
import { setToast } from "@reducer/Toast/toast";
import { checkBadWord } from "@utils/checkBadWord/checkBadWord";
import ToastComponent from "@components/Toast/Toast";
import { useMemberDataUpdate } from "@hooks/useMemberDataUpdate";
import { useHandleImageUpdates } from "@hooks/useHandleImageUpdates/useHandleImageUpdates";

interface AdminEditModalProps {
  onClose: () => void; // A function to close the modal
}

const AdminEdit: React.FC<AdminEditModalProps> = ({ onClose }) => {
  const [cookies] = useCookies();
  const token = cookies.accessToken;

  const [userData, setUserdata] = useState<getMemberDTO>();

  const dispatch = useDispatch();

  // 유효상태
  const [nicknameValidation, setNicknameValidation] = useState<boolean>(true);

  const handleImageUpdates = useHandleImageUpdates();

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

  useEffect(() => {
    setUpdateMemberData((prevData) => ({
      ...prevData,
      username: "",
    }));
  }, [])

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
    if (name === "username") {

      if (value) {
        try {
          const checkNicknameBack = await getNicknameAvailable(value, token);
          if (
            !checkBadWord(value) &&
            checkNickname(value) &&
            checkNicknameBack.status === 200
          ) {
            dispatch(setProfileUsername(value));
            setNicknameValidation(true);
          } else if (input.username === userData?.username) {
            setNicknameValidation(true);
          } else if (!checkNickname(value)) {
            setNicknameValidation(false);
          } else if (checkBadWord(value)) {
            setNicknameValidation(false);
          }
        } catch (error: any) {
          // If the status is 400, simply skip the error
          if (error.response && error.response.status === 400) {
            setNicknameValidation(false);
            // 닉네임을 수정하고 같은 닉네임일때
            if (value === userData?.username) {
              setNicknameValidation(true);
              setUpdateMemberData((prevData) => ({
                ...prevData,
                username: "",
              }));
              return;
            }

          } else {
            console.error("Error checking nickname:", error);
          }
        }
      } else {
        setNicknameValidation(false);
      }
    } else if (name === "introduction") {
      dispatch(setProfileIntroduction(value));
    }
  };


  // 배경화면
  const [
    uploadUserProfileBackgroundImage,
    setUploadUserProfileBackgroundImage,
  ] = useState<string | null>(null);

  const handleUploadUserProfileBackgroundImage = (image: string) =>
    setUploadUserProfileBackgroundImage(image);

  const handleCompressUserProfileBackgroundImage = useCallback(async () => {
    if (!uploadUserProfileBackgroundImage) return;

    setUpdateMemberData((prevData) => ({
      ...prevData,
      backgroundImage: uploadUserProfileBackgroundImage,
    }));
    dispatch(setDeleteProfileBackgroundImage(false));
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

  const handleUploadUserProfileImage = (image: string) =>
    setUploadUserProfileImage(image);

  const handleCompressUserProfileImage = useCallback(async () => {
    if (!uploadUserProfileImage) return;

    setUpdateMemberData((prevData) => ({
      ...prevData,
      profileImage: uploadUserProfileImage,
    }));
    dispatch(setDeleteProfileImage(false));
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
    dispatch(setDeleteProfileImage(false));
    dispatch(setDeleteProfileBackgroundImage(false));

    setIsOpen(!isOpen);
    // 애니메이션 용 타이머
    setTimeout(() => {
      close();
    }, 900);
  };

  // 초깃값
  const {
    username,
    profileImage,
    profileBackgroundImage,
    introduction,
    deleteProfileImage,
    deleteBackgroundImage,
  } = useSelector((state: RootState) => state.userProfile);
  const [updateMemberData, setUpdateMemberData] = useState<UpdateMemberParams>({
    // 입력없을때 닉네임 통과
    username: username || "", // Use the directly obtained value
    introduction: introduction,
    profileImage: profileImage,
    backgroundImage: profileBackgroundImage,
    cookies: token,
    deleteProfileImage: deleteProfileImage,
    deleteBackgroundImage: deleteBackgroundImage,
  });

  useMemberDataUpdate({ setUpdateMemberData, deleteProfileImage, deleteBackgroundImage });

  const navigate = useNavigate();

  useEffect(() => {
    if (!nicknameValidation) {
      dispatch(setToast("nicknameValidation"));
      return;
    }
  }, [nicknameValidation, dispatch]);

  const handleMember = async (data: UpdateMemberParams) => {
    console.log("Saving data:", data);

    // 저장하고 같은 닉네임을 저장할때
    if (updateMemberData.username === input.username) {
      setNicknameValidation(true);
    }

    await new Promise((resolve) => setTimeout(resolve, 300));

    if (nicknameValidation) {
      const code = await updateMember(data);
      // 이후에 code를 이용한 로직을 이어서 작성하면 됩니다.

      if (code.status === 200) {

        handleImageUpdates({ 
          uploadUserProfileImage: uploadUserProfileImage,
          deleteProfileImage: deleteProfileImage,
          uploadUserProfileBackgroundImage: uploadUserProfileBackgroundImage,
          deleteBackgroundImage: deleteBackgroundImage
        });

        navigate(`/user/${code.data.username}`);
      }

      setIsOpen(!isOpen);
      // 애니메이션 용 타이머
      setTimeout(() => {
        close();
      }, 900);
    }
  };
  // 토스트
  const { toast } = useSelector((state: RootState) => state.toast);

  const handleNotMember = () => {
    dispatch(setToast("nicknameValidation"));
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      {/* The following div creates a semi-transparent overlay background */}
      <div className="absolute inset-0 bg-gray-800 opacity-75 "></div>

      <div
        className={`relative ${size ? "w-[390px]" : "w-full"
          } h-full mt-5 bg-white rounded-t-3xl shadow-lg
        animate-slide-edit-${isOpen ? "in" : "out"}`}
      >
        {toast === "duplicate" && (
          <ToastComponent background="black" text="닉네임이 중복되었습니다 ! " />
        )}
        {toast === "nicknameValidation" && (
          <ToastComponent background="black" text="닉네임을 수정해주세요 ! " />
        )}

        {/* 상단 취소/저장 버튼 */}
        <div className="flex justify-between h-[50px]">
          <EditButton
            save={nicknameValidation ? handleMember : handleNotMember}
            cancel={cancel}
            updateMemberData={updateMemberData}
          />
        </div>

        {/* 배경화면 */}
        <SetUserProfileBackground
          aspectRatio={1 / 1}
          onCrop={handleUploadUserProfileBackgroundImage}
          earlyImage={userData?.backgroundImageUrl}
          profileBackgroundImage={updateMemberData.backgroundImage}
        />

        {/* 프로필 사진 */}
        <SetUserProfileImage
          aspectRatio={1 / 1}
          onCrop={handleUploadUserProfileImage}
          earlyImage={userData?.profileImageUrl}
          profileImage={updateMemberData.profileImage}
        />

        {/* 유저 닉네임 */}
        <SetUserProfileInfo
          placeholder="닉네임"
          maxlength={999}
          name="username"
          value={userData?.username}
          onChange={onChangeInput}
        />

        {/* 한줄소개 */}
        <SetUserProfileInfo
          placeholder="한줄소개"
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
