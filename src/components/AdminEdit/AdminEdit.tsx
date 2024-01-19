import React, { useCallback, useEffect, useState } from "react";
import {  useSelector } from "react-redux";

import { RootState } from "@store/index";
import useWindowSizeCustom from "@hooks/useWindowSizeCustom";
import "../../styles/Admin/style.css";
import EditButton from "@components/AdminEdit/Button/EditButton";
import SetUserProfileBackground from "@components/AdminEdit/SetUserProfileBackground";
import SetUserProfileImage from "@components/AdminEdit/SetUserProfileImage";
import SetUserProfileInfo from "@components/AdminEdit/SetUserProfileInfo";
import useImageCompress from "@hooks/useImageCompress";
import { dataURItoFile } from "@utils/ImageCrop/common";
import { getMemberDTO } from "types/Member/Member";
import { useCookies } from "react-cookie";
import { getMemberMe, updateMember } from "@api/member-controller/memberController";

interface AdminEditModalProps {
  onClose: () => void; // A function to close the modal
}

const AdminEdit: React.FC<AdminEditModalProps> = ({ onClose }) => {
  const userProfile = useSelector((state: RootState) => state.userProfile);

  const [username, setUsername] = useState("Your Username");
  const [introText, setIntroText] = useState("Welcome to the Admin Page");

  // 배경화면 
  const [uploadUserProfileBackgroundImage, setUploadUserProfileBackgroundImage] = useState<string | null>(null);
  const [compressedUserProfileBackgroundImage, setCompressedUserProfileBackgroundImage] = useState<string | null>(userProfile.userProfileBackgroundImage);
  const { isLoading: isCompressUserProfileBackgroundLoading, compressImage : compressUserProfileBackgroundImage } = useImageCompress();
  const { isLoading: isCompressUserProfileLoading, compressImage : compressUserProfileImage } = useImageCompress();

  const handleUploadUserProfileBackgroundImage = (image: string) => setUploadUserProfileBackgroundImage(image);

  const handleCompressUserProfileBackgroundImage = useCallback(async () => {
    if (!uploadUserProfileBackgroundImage) return;

    const imageFile = dataURItoFile(uploadUserProfileBackgroundImage);

    const compressedUserProfileBackgroundImage = await compressUserProfileBackgroundImage(imageFile);

    if (!compressedUserProfileBackgroundImage) return;
    const imageUrl = URL.createObjectURL(compressedUserProfileBackgroundImage);
    setCompressedUserProfileBackgroundImage(imageUrl);
  }, [uploadUserProfileBackgroundImage, compressUserProfileBackgroundImage]);

  useEffect(() => {
    if (uploadUserProfileBackgroundImage) {
      handleCompressUserProfileBackgroundImage();
    }
  }, [uploadUserProfileBackgroundImage, handleCompressUserProfileBackgroundImage]);

  // 프로필사진
  const [uploadUserProfileImage, setUploadUserProfileImage] = useState<string | null>(null);
  const [compressedUserProfileImage, setCompressedUserProfileImage] = useState<string | null>(userProfile.userProfileImage);
  

  const handleUploadUserProfileImage = (image: string) => setUploadUserProfileImage(image);

  const handleCompressUserProfileImage = useCallback(async () => {
    if (!uploadUserProfileImage) return;

    const imageFile = dataURItoFile(uploadUserProfileImage);

    const compressedUserProfileImage = await compressUserProfileImage(imageFile);

    if (!compressedUserProfileImage) return;
    const imageUrl = URL.createObjectURL(compressedUserProfileImage);
    setCompressedUserProfileImage(imageUrl);
  }, [uploadUserProfileImage, compressUserProfileImage]);

  useEffect(() => {
    if (uploadUserProfileImage) {
      handleCompressUserProfileImage();
    }
  }, [uploadUserProfileImage, handleCompressUserProfileImage]);

  // // redux에 저장.  
  // const save = () => {
  //   if (ValidateSpace(username)) {
  //     return;
  //   }
  
  //   dispatch(updateProfile({ username, introText }));
  
  //   if (compressedUserProfileImage) {
  //     dispatch(setUserProfileImage(compressedUserProfileImage));
  //   }
  //   if (uploadUserProfileBackgroundImage) {
  //     dispatch(setUserProfileBackgroundImage(compressedUserProfileBackgroundImage));
  //   }
  
  //   cancel();
  // };

  // 모달닫기
  const close = () => {
    onClose(); // Close the modal without saving changes
  };


  const {windowSize} = useWindowSizeCustom();
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
    setIsOpen(!isOpen);
    // 애니메이션 용 타이머
    setTimeout(() => {
      close();
    }, 900);
  };

  const [cookies,] = useCookies();
  const token = cookies.accessToken;

  const [userData,setUserdata] = useState<getMemberDTO>();

   // 정보불러오기
   useEffect(() => {
    const fetchData = async () => {
      try {
        // Call the asynchronous function and await its result
        const userDataResult = await getMemberMe(cookies.accessToken);
        setUserdata(userDataResult.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle errors appropriately
      }
    };
  
    // Call the asynchronous function inside useEffect
    fetchData();
  }, [userData, cookies.accessToken]); 

  const handleMember = (username: string,
    introduction: string,
    profileImage?: any,
    backgroundImage?: any,
    cookies?: string) => {
    updateMember(username,introduction,profileImage,backgroundImage,cookies);
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      {/* The following div creates a semi-transparent overlay background */}
      <div className="absolute inset-0 bg-gray-800 opacity-75 "></div>
      <div
        className={`relative ${
          size ? "w-[390px]" : "w-full"
        } h-full mt-5 bg-white rounded-t-3xl shadow-lg
        animate-slide-edit-${isOpen ? "in" : "out"}`}
      >
        {/* 상단 취소/저장 버튼 */}
        <div className="flex justify-between h-[50px]">
          <EditButton save={() => handleMember(username, introText, compressUserProfileImage, compressedUserProfileBackgroundImage, token)}
                      cancel={cancel}  />
        </div>

        {/* 배경화면 */}
        <SetUserProfileBackground
          aspectRatio={1/1}
          onCrop={handleUploadUserProfileBackgroundImage}
          compressedImage={compressedUserProfileBackgroundImage}
          isCompressLoading={isCompressUserProfileBackgroundLoading}
        />

        {/* 프로필 사진 */}
        <SetUserProfileImage
          aspectRatio={1/1}
          onCrop={handleUploadUserProfileImage}
          compressedImage={compressedUserProfileImage}
          isCompressLoading={isCompressUserProfileLoading}
        />
      
        {/* 유저 닉네임 */}
        <SetUserProfileInfo
          placeholder="User Name"
          maxlength={999}
          context={userData?.username}
          func={setUsername}
        />

        {/* 한줄소개 */}
        <SetUserProfileInfo
          placeholder="Comment"
          maxlength={50}
          context={userData?.introduction}
          func={setIntroText}
        />
      </div>
    </div>
  );
};

export default AdminEdit;
