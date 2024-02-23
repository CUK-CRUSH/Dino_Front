import { playlistNameState } from "@atoms/Playlist/playlistName";
import useCompareToken from "@hooks/useCompareToken/useCompareToken";
import CustomModal from "@utils/Modal/Modal";
import { useCallback, useState } from "react";
import { FaAngleLeft, FaEllipsisVertical } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Home from "@assets/Home.svg";

type MainEditButtonProps = {
  playlists: any[];
  uploadImage: string | null;
  fetchPlaylist: () => void;
  setPlaylistName: (name: string) => void;
  memberId: string | null | undefined;
};

export const MainEditButton = ({
  playlists,
  uploadImage,
  fetchPlaylist,
  setPlaylistName,
  memberId,
}: MainEditButtonProps) => {
  const playlistName = useRecoilValue(playlistNameState);

  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const { username: paramUsername } = useParams<{
    username: string | undefined;
  }>();

  const handleBack = () => {
    const path = window.location.pathname;
    navigate(-1);

    // 경로가 /user/{username}/{playlistId} 형태인지 확인
    const isPlaylistPath = /\/user\/[^/]+\/\d+/.test(path);

    if (isPlaylistPath) {
      // 경로가 /user/{username}/{playlistId} 형태이면 페이지를 리로드
      setTimeout(() => window.location.reload(), 100);
    }
  };

  const handleUserHome = () => {
    navigate(`/user/${paramUsername}`);
  };

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
  const authority = useCompareToken(memberId);

  return (
    <div className="flex h-[5%] smartPhoneXs:h-[3.5%] smartPhone:h-[3.5%] tabletMini:h-[3%] tablet:h-[3%] items-center justify-between m-3 text-[19px]">
      <button type="button" onClick={handleBack} className="text-white">
        <FaAngleLeft size={24} />
      </button>
      <div className="flex justify-center w-full mr-3">
        <div onClick={handleUserHome} className="flex flex-row cursor-pointer">
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
          <FaEllipsisVertical size={24} />
        </button>
      )}

      <CustomModal {...modalProps} />
    </div>
  );
};
