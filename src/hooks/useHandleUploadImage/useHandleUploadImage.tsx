import { useEffect } from 'react';

function useHandleUploadImage(uploadUserImage : string | null, handleCompressUserImage : () => Promise<void>) {
  useEffect(() => {
    if (uploadUserImage) {
      handleCompressUserImage();
    }
  }, [uploadUserImage, handleCompressUserImage]);
}

export default useHandleUploadImage