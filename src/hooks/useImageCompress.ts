import imageCompression from "browser-image-compression";
import { useDispatch, useSelector } from "react-redux";
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
      maxSizeMB: 2,
      maxWidthOrHeight: 1080,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(imageFile, options);
      dispatch(setIsLoading(false));

      const base64data = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(compressedFile);
        reader.onloadend = function() {
          resolve(reader.result);
        }
        reader.onerror = reject;
      });

      return {compressedFile, base64data};
    } catch (error) {
      dispatch(setIsLoading(false));
      console.log(error);
    }
  };
  return { compressImage, isLoading };
};

export default useImageCompress;