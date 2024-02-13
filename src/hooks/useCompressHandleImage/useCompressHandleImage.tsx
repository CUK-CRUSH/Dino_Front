import React, { Dispatch, SetStateAction, useCallback} from 'react';
import { useDispatch } from 'react-redux';
import { UpdateMemberParams } from 'types/AdminEdit';

// interface useCompressUserImageProps {
//   uploadUserImage: string | null;
//   convertUrlToBlobFile: (url: string) => Promise<File>;
//   compressedImage: (file: File, type: string, setUpdateMemberData: React.Dispatch<React.SetStateAction<UpdateMemberParams>>) => void;
//   setUpdateMemberData: Dispatch<SetStateAction<UpdateMemberParams>>;
//   setDeleteImage: ActionCreatorWithPayload<any, any>;
//   type: string;
// }

const useCompressHandleImage = (
  uploadUserImage: string | null, convertUrlToBlobFile: (url: string) => Promise<File>,
  compressedImage: (file: File, type: string, setUpdateMemberData: React.Dispatch<React.SetStateAction<UpdateMemberParams>>) => void,
  setUpdateMemberData: Dispatch<SetStateAction<UpdateMemberParams>>,
  setDeleteImage: any,
  type: string) => {

  const dispatch = useDispatch();

  const handleCompressUserProfileBackgroundImage = useCallback(async () => {
    if (!uploadUserImage) return;

    const file = convertUrlToBlobFile(uploadUserImage);

    compressedImage(await file, type, setUpdateMemberData);

    dispatch(setDeleteImage(false));
  }, [uploadUserImage, dispatch, compressedImage, convertUrlToBlobFile, setDeleteImage, setUpdateMemberData, type]);

  return handleCompressUserProfileBackgroundImage;
};

export default useCompressHandleImage;