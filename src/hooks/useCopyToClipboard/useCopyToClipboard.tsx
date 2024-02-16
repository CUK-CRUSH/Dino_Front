import { useDispatch } from 'react-redux';
import { setToast } from '@reducer/Toast/toast';

const useCopyToClipboard = () => {
  const dispatch = useDispatch();

  const handleCopyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      dispatch(setToast('copy'));
    } catch (err) {
      console.log(err);
    }
  };

  return { handleCopyToClipboard };
};

export default useCopyToClipboard;