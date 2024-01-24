import { useParams } from "react-router-dom";
import Progress from "./Progress";
import Skip from "./Skip";
import Text from "./Text";
import { useCallback, useEffect, useState } from "react";
import { dataURItoFile } from "@utils/ImageCrop/common";
import useImageCompress from "@hooks/useImageCompress";
import SetProfileImage from "./Setter/SetProfileImage";
import SetProfileBackgroundImage from "./Setter/SetProfileBackgroundImage";
import SetProfileIntroduction from "./Setter/SetProfileIntroduction";
import { setProfileBackgroundImage, setProfileImage } from "@reducer/setProfile/setProfile";
import { useDispatch } from "react-redux";

export const SetProfilePage = () => {
  // 프로필 설정 단계
  const { step } = useParams<{ step?: string }>();
  const parsedStep = parseInt(step || "1", 10);
  const dispatch = useDispatch();
  // 프로필사진
  const [uploadUserProfileImage, setUploadUserProfileImage] = useState<
    string | null
  >(null);
  const [compressedUserProfileImage, setCompressedUserProfileImage] = useState<
    string | undefined | null
  >();
  const {
    isLoading: isCompressUserProfileLoading,
    compressImage: compressUserProfileImage,
  } = useImageCompress();

  const handleUploadUserProfileImage = (image: string) =>
    setUploadUserProfileImage(image);

  const handleCompressUserProfileImage = useCallback(async () => {
    if (!uploadUserProfileImage) return;

    const imageFile = dataURItoFile(uploadUserProfileImage);

    const compressedUserProfileImage = await compressUserProfileImage(
      imageFile
    );

    if (!compressedUserProfileImage) return;
    const imageUrl = URL.createObjectURL(compressedUserProfileImage);
    setCompressedUserProfileImage(imageUrl);
    dispatch(setProfileImage(uploadUserProfileImage));
  }, [uploadUserProfileImage, compressUserProfileImage]);

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
  const [
    compressedUserProfileBackgroundImage,
    setCompressedUserProfileBackgroundImage,
  ] = useState<string | undefined | null>();
  const {
    isLoading: isCompressUserProfileBackgroundLoading,
    compressImage: compressUserProfileBackgroundImage,
  } = useImageCompress();

  const handleUploadUserProfileBackgroundImage = (image: string) =>
    setUploadUserProfileBackgroundImage(image);

  const handleCompressUserProfileBackgroundImage = useCallback(async () => {
    if (!uploadUserProfileBackgroundImage) return;

    const imageFile = dataURItoFile(uploadUserProfileBackgroundImage);
    const compressedUserProfileBackgroundImage =
      await compressUserProfileBackgroundImage(imageFile);

    if (!compressedUserProfileBackgroundImage) return;
    const imageUrl = URL.createObjectURL(compressedUserProfileBackgroundImage);

    setCompressedUserProfileBackgroundImage(imageUrl);
    dispatch(setProfileBackgroundImage(uploadUserProfileImage));

  }, [
    uploadUserProfileBackgroundImage,
    compressUserProfileBackgroundImage,
  ]);

  useEffect(() => {
    if (uploadUserProfileBackgroundImage) {
      handleCompressUserProfileBackgroundImage();
    }
  }, [
    uploadUserProfileBackgroundImage,
    handleCompressUserProfileBackgroundImage,
  ]);



  return (
    <div className="w-full h-full relative bg-white flex flex-col align-middle items-center">
      <Skip />
      <Progress step={parsedStep} />
      <Text step={parsedStep} />
      {parsedStep === 1 && <SetProfileImage
        aspectRatio={1 / 1}
        onCrop={handleUploadUserProfileImage}
        compressedImage={compressedUserProfileImage}
        isCompressLoading={isCompressUserProfileLoading} 
        earlyImage={undefined} />}
      {parsedStep === 2 && <SetProfileBackgroundImage 
        aspectRatio={1 / 1}
        onCrop={handleUploadUserProfileBackgroundImage}
        compressedImage={compressedUserProfileBackgroundImage}
        isCompressLoading={isCompressUserProfileBackgroundLoading} 
        earlyImage={undefined} />}
      {parsedStep === 3 && <SetProfileIntroduction />}

    </div>
  );
};