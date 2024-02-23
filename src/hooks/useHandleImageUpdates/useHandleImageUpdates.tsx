import { useDispatch } from "react-redux";
import {
  setDeleteProfileBackgroundImage,
  setDeleteProfileImage,
  setProfileBackgroundImage,
  setProfileImage,
} from "@reducer/Admin/userProfileSlice";

interface HandleImageUpdatesProps {
  uploadUserProfileImage?: string | null
  deleteProfileImage?: boolean;
  uploadUserProfileBackgroundImage?: string | null
  deleteBackgroundImage?: boolean;
}

export const useHandleImageUpdates = () => {
  const dispatch = useDispatch();

  const handleImageUpdates = ({
    uploadUserProfileImage,
    deleteProfileImage,
    uploadUserProfileBackgroundImage,
    deleteBackgroundImage
  }: HandleImageUpdatesProps) => {

    if (uploadUserProfileImage) {
      dispatch(setProfileImage(uploadUserProfileImage));
    }

    if (deleteProfileImage) {
      dispatch(setProfileImage(null));
    }

    if (uploadUserProfileBackgroundImage) {
      dispatch(setProfileBackgroundImage(uploadUserProfileBackgroundImage));
    }

    if (deleteBackgroundImage) {
      dispatch(setProfileBackgroundImage(null));
    }

    dispatch(setDeleteProfileImage(false));
    dispatch(setDeleteProfileBackgroundImage(false));
  }

  return handleImageUpdates;
}