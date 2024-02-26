import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setProfileBackgroundImageLoader, setProfileImageLoader } from "@reducer/imageLoader/imageLoader";
import useImageCompress from "@hooks/useImageCompress";
import { UpdateMemberParams } from "types/AdminEdit";

const useCompressedImage = () => {
  const { compressImage } = useImageCompress();
  const dispatch = useDispatch();
  
/* eslint-disable react-hooks/exhaustive-deps */
  const compressedImage = useCallback(async (file: File, type: string | undefined , setUpdateMemberData: React.Dispatch<React.SetStateAction<UpdateMemberParams>>) => {
    const compressedImageResult = await compressImage(file);
    if (!type) {
      throw new Error("Type must be 'profileImage' or 'profileBackgroundImage'");
    }
    
    if (type === 'profileImage') {
      dispatch(setProfileImageLoader(true));
    } else {
      dispatch(setProfileBackgroundImageLoader(true));
    }

    if (compressedImageResult) {
      const { base64data } = compressedImageResult;

      if (type === 'profileImage') {
        dispatch(setProfileImageLoader(false));
      } else {
        dispatch(setProfileBackgroundImageLoader(false));
      }

      setUpdateMemberData((prevData: UpdateMemberParams) => ({
        ...prevData,
        [type]: base64data,
      }));
    }
  }, []);

  return compressedImage;
};

export default useCompressedImage;