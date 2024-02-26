import { useNavigate, useParams } from "react-router-dom";
import Progress from "./Progress";
import Skip from "./Skip";
import Text from "./Text";
import {  useEffect, useState } from "react";
import SetProfileImage from "./Setter/SetProfileImage";
import SetProfileBackgroundImage from "./Setter/SetProfileBackgroundImage";
import SetProfileIntroduction from "./Setter/SetProfileIntroduction";
import { setProfileBackgroundImage, setProfileImage, setProfileIntroduction } from "@reducer/setProfile/setProfile";
import { useDispatch } from "react-redux";
import Next from "./Next";
import { getMemberUsername } from "@api/member-controller/memberController";
import useCompressedImage from "@hooks/useCompressImage/useCompressImage";
import useCompressHandleImage from "@hooks/useCompressHandleImage/useCompressHandleImage";
import convertUrlToBlobFile from "@utils/convertFile/convertFile";
import useHandleUploadImage from "@hooks/useHandleUploadImage/useHandleUploadImage";

export const SetProfilePage = () => {
  // 프로필 설정 단계
  const { username, step } = useParams<{ username?: string, step?: string }>();
  const parsedStep = parseInt(step || "1", 10);
  const dispatch = useDispatch();
  // 프로필사진
  const [uploadUserProfileImage, setUploadUserProfileImage] = useState<
    string | null
  >(null);

  useEffect(()=>{
    dispatch(setProfileImage(uploadUserProfileImage))
  },[uploadUserProfileImage,dispatch])

  const handleUploadUserProfileImage = (image: string) =>
    setUploadUserProfileImage(image);

  const compressedImage = useCompressedImage();

  const handleProfileImageCompress = useCompressHandleImage(
    uploadUserProfileImage,
    convertUrlToBlobFile,
    compressedImage,
    undefined,
    undefined,
    ""
  );

  useHandleUploadImage(uploadUserProfileImage, handleProfileImageCompress);

  // 배경화면
  const [
    uploadUserProfileBackgroundImage,
    setUploadUserProfileBackgroundImage,
  ] = useState<string | null>(null);

  useEffect(()=>{
    dispatch(setProfileBackgroundImage(uploadUserProfileBackgroundImage))
  },[uploadUserProfileBackgroundImage,dispatch])

  const handleUploadUserProfileBackgroundImage = (image: string) =>
    setUploadUserProfileBackgroundImage(image);

  const handleProfileBackgroundImageCompress = useCompressHandleImage(
    uploadUserProfileBackgroundImage,
    convertUrlToBlobFile,
    compressedImage,
    undefined,
    undefined,
    ""
  );

  useHandleUploadImage(
    uploadUserProfileBackgroundImage,
    handleProfileBackgroundImageCompress
  );

  // 한줄소개
  const [input, setInput] = useState({
    introduction: '',
  });

  const onChangeInput = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target; // destructuring
    setInput({
      ...input,
      [name]: value,
    });

    dispatch(setProfileIntroduction(value));
  };

  const navigate = useNavigate();

  useEffect(() => {
    /* eslint-disable react-hooks/exhaustive-deps */
    if (username) {
      (async () => {
        try {
          if (true) {
            const getUserData = await getMemberUsername(username);
            
            // 접근 제한
            if (getUserData.data.backgroundImageUrl !== null || getUserData.data.profileImageUrl !== null || getUserData.data.introduction !== '') {
              navigate(`/user/${getUserData.data.username}`);
            }
          }
        } catch (error) {
          console.error("Error fetching member:", error);
        }
      })();
    } else {
      console.error("Decoded token is not present");
    }
  }, []);

  return (
    <div className="w-full h-full relative bg-white flex flex-col align-middle items-center">
      <Skip
        step={parsedStep}
        username={username}
      />
      <Progress step={parsedStep} />
      <Text step={parsedStep} />
      {parsedStep === 1 && <SetProfileImage
        aspectRatio={1 / 1}
        onCrop={handleUploadUserProfileImage}
      />}
      {parsedStep === 2 && <SetProfileBackgroundImage
        aspectRatio={1 / 1}
        onCrop={handleUploadUserProfileBackgroundImage}
      />}
      {parsedStep === 3 && <SetProfileIntroduction
        placeholder="한 줄 소개"
        maxlength={999}
        name="introduction"
        value={''}
        onChange={onChangeInput} />}

      <Next
        step={parsedStep}
        username={username}

      />
    </div>
  );
};