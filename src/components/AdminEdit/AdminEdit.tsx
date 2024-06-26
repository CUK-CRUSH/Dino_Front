import React, { useEffect, useState } from "react";
import "../../styles/Admin/style.css";
import EditButton from "@components/AdminEdit/Button/EditButton";
import SetUserProfileBackground from "@components/AdminEdit/SetUserProfileBackground";
import SetUserProfileImage from "@components/AdminEdit/SetUserProfileImage";
import { getMemberDTO } from "types/Admin";
import { useCookies } from "react-cookie";
import {
  getMemberMe,
  getNicknameAvailable,
  updateMember,
} from "@api/member-controller/memberController";
import { UpdateMemberParams } from "types/AdminEdit";

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
import { useMemberDataUpdate } from "@hooks/useMemberDataUpdate";
import { useHandleImageUpdates } from "@hooks/useHandleImageUpdates/useHandleImageUpdates";
import SetUserProfileNickname from "@components/AdminEdit/SetUserProfileNickname";
import SetUserProfileIntroduction from "./SetUserProfileIntroduction";
import useCompressedImage from "@hooks/useCompressImage/useCompressImage";
import convertUrlToBlobFile from "@utils/convertFile/convertFile";
import useHandleUploadImage from "@hooks/useHandleUploadImage/useHandleUploadImage";
import useCompressHandleImage from "@hooks/useCompressHandleImage/useCompressHandleImage";
import useResponsiveWidth from "@hooks/useResponsiveWidth/useResponsiveWidth";
import { notify } from "@utils/toast/toast";

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

  // 이미지 전역관리
  const handleImageUpdates = useHandleImageUpdates();

  // 정보불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Call the asynchronous function and await its result
        const userDataResult = await getMemberMe(token);
        setUserdata(userDataResult.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle errors appropriately
      }
    };
    fetchData();
  }, [token]);

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
      introduction: "",
    }));
  }, []);

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
      console.log(value)
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
    username: username , // Use the directly obtained value
    introduction: introduction,
    profileImage: profileImage,
    backgroundImage: profileBackgroundImage,
    cookies: token,
    deleteProfileImage: deleteProfileImage,
    deleteBackgroundImage: deleteBackgroundImage,
  });
  // 프로필사진
  const [uploadUserProfileImage, setUploadUserProfileImage] = useState<
    string | null
  >(null);

  const handleUploadUserProfileImage = (image: string) =>
    setUploadUserProfileImage(image);

  const compressedImage = useCompressedImage();

  const handleProfileImageCompress = useCompressHandleImage(
    uploadUserProfileImage,
    convertUrlToBlobFile,
    compressedImage,
    setUpdateMemberData,
    setDeleteProfileImage,
    "profileImage"
  );

  useHandleUploadImage(uploadUserProfileImage, handleProfileImageCompress);

  // 배경화면
  const [
    uploadUserProfileBackgroundImage,
    setUploadUserProfileBackgroundImage,
  ] = useState<string | null>(null);

  const handleUploadUserProfileBackgroundImage = (image: string) =>
    setUploadUserProfileBackgroundImage(image);

  const handleProfileBackgroundImageCompress = useCompressHandleImage(
    uploadUserProfileBackgroundImage,
    convertUrlToBlobFile,
    compressedImage,
    setUpdateMemberData,
    setDeleteProfileBackgroundImage,
    "backgroundImage"
  );

  useHandleUploadImage(
    uploadUserProfileBackgroundImage,
    handleProfileBackgroundImageCompress
  );

  // 모달닫기
  const close = () => {
    onClose(); // Close the modal without saving changes
  };

  // 열고닫기
  const [isOpen, setIsOpen] = useState(true);

  // 모달 반응형 크기
  const modalResponsiveWidth = useResponsiveWidth();
  // 취소
  const cancel = () => {
    
    dispatch(setProfileUsername(userData?.username));
    dispatch(setProfileIntroduction(userData?.introduction));
    dispatch(setDeleteProfileImage(false));
    dispatch(setDeleteProfileBackgroundImage(false));

    setIsOpen(!isOpen);
    // 애니메이션 용 타이머
    setTimeout(() => {
      close();
    }, 900);
  };

  useMemberDataUpdate({
    setUpdateMemberData,
    deleteProfileImage,
    deleteBackgroundImage,
  });

  useEffect(() => {
    if (!nicknameValidation) {
      notify('닉네임을 확인해주세요 !',"black")
      return;
    }
  }, [nicknameValidation, dispatch]);

  const [backSpace, setBackSpace] = useState<boolean>(false);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!input.introduction) {
      // 입력이 없고
      if (event.key === "Backspace") {
        setBackSpace(true);
        setUpdateMemberData((prevData) => ({
          ...prevData,
          introduction: "",
        }));
        dispatch(setProfileIntroduction(""));
      }
    }
  };

  const handleMember = async (data: UpdateMemberParams) => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (!input.introduction && !backSpace) {
      data.introduction = userData?.introduction;
    }

    if (nicknameValidation) {
      const code = await updateMember(data);
      if (code && code.status === 200) {
        handleImageUpdates({
          uploadUserProfileImage: uploadUserProfileImage,
          deleteProfileImage: deleteProfileImage,
          uploadUserProfileBackgroundImage: uploadUserProfileBackgroundImage,
          deleteBackgroundImage: deleteBackgroundImage,
        });
        localStorage.setItem("homeUrl", code.data.username); // Set refreshToken in local storage
      }

      setIsOpen(!isOpen);
      // 애니메이션 용 타이머
      setTimeout(() => {
        close();
      }, 900);
    }
  };

  const handleNotMember = () => {
    dispatch(setToast("nicknameValidation"));
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      {/* The following div creates a semi-transparent overlay background */}
      <div className="absolute inset-0 bg-gray-800 opacity-75 " />

      <div
        className={`relative ${modalResponsiveWidth} h-full mt-5 bg-white rounded-t-3xl shadow-lg
        animate-slide-edit-${isOpen ? "in" : "out"}`}
      >

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
          aspectRatio={1}
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
        <SetUserProfileNickname
          placeholder="닉네임"
          maxlength={999}
          name="username"
          value={userData?.username}
          onChange={onChangeInput}
          nicknameValidation={nicknameValidation}
        />

        {/* 한줄소개 */}
        <SetUserProfileIntroduction
          placeholder="한줄소개"
          maxlength={50}
          name="introduction"
          value={userData?.introduction}
          onChange={onChangeInput}
          handleKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default AdminEdit;
