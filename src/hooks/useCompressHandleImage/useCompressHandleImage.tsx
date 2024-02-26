import  { Dispatch, SetStateAction, useCallback} from 'react';
import { useDispatch } from 'react-redux';
import { UpdateMemberParams } from 'types/AdminEdit';


const useCompressHandleImage = (
  uploadUserImage: string | null, 
  convertUrlToBlobFile: (url: string) => Promise<File>,
  compressedImage: (file: File, type: string | undefined, setUpdateMemberData: Dispatch<SetStateAction<UpdateMemberParams>>) => void,
  setUpdateMemberData?: Dispatch<SetStateAction<UpdateMemberParams>>,
  setDeleteImage?: any,
  type?: string) => {

  const dispatch = useDispatch();

  const handleCompressUserProfileBackgroundImage = useCallback(async () => {
    if (!uploadUserImage) return;

    const file = convertUrlToBlobFile(uploadUserImage);

    type && setUpdateMemberData && compressedImage(await file, type, setUpdateMemberData);

    setDeleteImage && dispatch(setDeleteImage(false));
  }, [uploadUserImage, dispatch, compressedImage, convertUrlToBlobFile, setDeleteImage, setUpdateMemberData, type]);

  return handleCompressUserProfileBackgroundImage;
};

export default useCompressHandleImage;