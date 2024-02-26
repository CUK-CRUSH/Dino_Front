import { useNavigate, useParams } from "react-router-dom";
import Progress from "./Progress";
import Skip from "./Skip";
import Text from "./Text";
import { useCallback, useEffect, useState } from "react";
import useImageCompress from "@hooks/useImageCompress";
import SetProfileImage from "./Setter/SetProfileImage";
import SetProfileBackgroundImage from "./Setter/SetProfileBackgroundImage";
import SetProfileIntroduction from "./Setter/SetProfileIntroduction";
import { setProfileBackgroundImage, setProfileImage, setProfileIntroduction } from "@reducer/setProfile/setProfile";
import { useDispatch } from "react-redux";
import Next from "./Next";
import { getMemberUsername } from "@api/member-controller/memberController";

export const SetProfilePage = () => {
  // 프로필 설정 단계
  const { username , step } = useParams<{ username? : string, step?: string }>();
  const parsedStep = parseInt(step || "1", 10);
  const dispatch = useDispatch();
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

    dispatch(setProfileImage(uploadUserProfileImage));
  }, [uploadUserProfileImage, dispatch]);

  useEffect(() => {
    if (uploadUserProfileImage) {
      handleCompressUserProfileImage();
    }
  }, [uploadUserProfileImage, handleCompressUserProfileImage]);

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
    dispatch(setProfileBackgroundImage(uploadUserProfileBackgroundImage));

  }, [
    uploadUserProfileBackgroundImage,
    dispatch
  ]);

  useEffect(() => {
    if (uploadUserProfileBackgroundImage) {
      handleCompressUserProfileBackgroundImage();
    }
  }, [
    uploadUserProfileBackgroundImage,
    handleCompressUserProfileBackgroundImage,
  ]);

  // 한줄소개
  const [input, setInput] = useState({
    introduction: undefined,
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
        isCompressLoading={isCompressUserProfileLoading} 
        />}
      {parsedStep === 2 && <SetProfileBackgroundImage 
        aspectRatio={1 / 1}
        onCrop={handleUploadUserProfileBackgroundImage}
        isCompressLoading={isCompressUserProfileBackgroundLoading} 
        />}
      {parsedStep === 3 && <SetProfileIntroduction 
          placeholder="한 줄 소개"
          maxlength={999}
          name="introduction"
          value={''}
          onChange={onChangeInput}/>}

        <Next 
          step={parsedStep}
          username={username}
            
          />
    </div>
  );
};