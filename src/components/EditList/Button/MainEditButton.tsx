import { playlistNameState } from "@atoms/Playlist/playlistName";
import CustomModal from "@utils/Modal/Modal";
import { useCallback, useState } from "react";
import { FaAngleLeft, FaEllipsisVertical } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

type MainEditButtonProps = {
  playlists: any[];
  uploadImage: string | null;
  token: string;
  musicData: any;
  fetchPlaylist: () => void;
  setPlaylistName: (name: string) => void;
  memberId: number | null;
};

export const MainEditButton = ({
  playlists,
  uploadImage,
  token,
  musicData,
  fetchPlaylist,
  setPlaylistName,
  memberId,
}: MainEditButtonProps) => {
  const playlistName = useRecoilValue(playlistNameState);

  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const tokenId = Number(localStorage.getItem("tokenId"));

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleModalToggle = useCallback(() => {
    setModalOpen((prev) => !prev);
  }, []);
  const modalProps = {
    isOpen: modalOpen,
    onRequestClose: handleModalToggle,
    compressedImage: null,
    playlists,
    uploadImage,
    token,
    musicData,
    fetchPlaylist,
    setPlaylistName,
    playlistName,
  };
  return (
    <div className="flex h-[5%] smartPhoneXs:h-[3.5%] smartPhone:h-[3.5%] tabletMini:h-[3%] tablet:h-[3%] items-center justify-between m-3 text-[19px]">
      <button type="button" onClick={handleBack} className="text-white">
        <FaAngleLeft size={24} />
      </button>

      {memberId === tokenId && tokenId && (
        <>
          <p className="text-center">플레이리스트</p>
          <button
            type="button"
            onClick={handleModalToggle}
            className="text-white"
          >
            <FaEllipsisVertical size={24} />
          </button>
        </>
      )}

      <CustomModal {...modalProps} />
    </div>
  );
};
