import { playlistNameState } from "@atoms/Playlist/playlistName";
import useCompareToken from "@hooks/useCompareToken/useCompareToken";
import CustomModal from "@utils/Modal/Modal";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import EditMusicIcon from "@assets/Header/EditMusic.svg";
import Home from "@assets/Home.svg";
import { RootState } from "@store/index";
import { useSelector, useDispatch } from "react-redux";
import { setToast } from "@reducer/Toast/toast";

type MainEditButtonProps = {
  playlists: any[];
  uploadImage: string | null;
  fetchPlaylist: () => void;
  setPlaylistName: (name: string) => void;
  memberId: string | null | undefined;
  tutorialStep: string | null;
};

export const MainEditButton = ({
  playlists,
  uploadImage,
  fetchPlaylist,
  setPlaylistName,
  memberId,
  tutorialStep,
}: MainEditButtonProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username: paramUsername } = useParams<{
    username: string | undefined;
  }>();
  const { toast } = useSelector((state: RootState) => state.toast);
  const playlistName = useRecoilValue(playlistNameState);
  const editIconRef = useRef<HTMLImageElement>(null);
  const authority = useCompareToken(memberId);
  const [modalOpen, setModalOpen] = useState(false);
  const cameFromVisitor = useLocation().state?.fromVisitor;

  // 토스트

  const handleBack = () => {
    toast && dispatch(setToast(""));

    if (cameFromVisitor) {
      navigate(`/user/${paramUsername}`);
    } else {
      navigate(-1);
    }
  };

  const handleUserHome = useCallback(() => {
    navigate(`/user/${paramUsername}`);
  }, [navigate, paramUsername]);

  const handleModalToggle = useCallback(() => {
    setModalOpen((prev) => !prev);
  }, []);
  const modalProps = {
    isOpen: modalOpen,
    onRequestClose: handleModalToggle,
    compressedImage: null,
    playlists,
    uploadImage,
    fetchPlaylist,
    setPlaylistName,
    playlistName,
  };

  // 권한부여

  useEffect(() => {
    tutorialStep === "env" && setModalOpen(true);
  }, [tutorialStep]);

  return (
    <div className="flex h-[4%] items-center justify-between m-3 text-[19px]">
      <button type="button" onClick={handleBack} className="text-white">
        <FaAngleLeft size={24} />
      </button>
      <div className="flex justify-center w-full mr-3">
        <div
          onClick={handleUserHome}
          className="flex flex-row cursor-pointer ml-3"
        >
          <img className="mr-1" src={Home} alt="home" />
          <p className="text-center">{paramUsername}</p>
        </div>
      </div>
      {authority && (
        <button
          type="button"
          onClick={handleModalToggle}
          className="text-white"
        >
          <img ref={editIconRef} src={EditMusicIcon} alt="edit" />
        </button>
      )}
      {tutorialStep === "env" && (
        <>
          <div className="absolute w-[300px] h-[80px] top-40 right-3 mt-1 z-20 bg-white text-black p-2 rounded-md font-bold flex items-center justify-center">
            <div className="text-start">
              <p className="mb-1">나의 플레이리스트에 곡을 추가하고,</p>
              <p>수정하거나 삭제할 수 있어요</p>
            </div>
          </div>
          <div className="w-6 h-6 bg-white absolute top-[155px] right-7 z-[19] transform rotate-45"></div>
        </>
      )}

      <CustomModal {...modalProps} />
    </div>
  );
};
