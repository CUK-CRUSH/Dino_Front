import imageCompression from "browser-image-compression";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";
import { setIsLoading } from "@reducer/editPlayList/Image/isImageCompress";

const useImageCompress = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(
    (state: RootState) => state.selectedFile.isLoading
  );

  const compressImage = async (imageFile: File) => {
    if (isLoading) return;
    dispatch(setIsLoading(true));

    const options = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 1080,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(imageFile, options);

      setIsLoading(false);

      return compressedFile;
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return { compressImage, isLoading };
};

export default useImageCompress;
