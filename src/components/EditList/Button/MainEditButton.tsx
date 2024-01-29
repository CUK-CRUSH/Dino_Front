import CustomModal from "@utils/Modal/Modal";
import { useCallback, useState } from "react";
import { FaAngleLeft, FaEllipsisVertical } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export const MainEditButton: React.FC<{
  playlists: any[];
  uploadImage: string | null;
  token: string;
  playlistName: string;
  musicData: any;
  playlistId: string | undefined;
  username: string | null;
}> = ({
  playlists,
  uploadImage,
  token,
  playlistName,
  musicData,
  playlistId,
  username,
}) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);
  return (
    <div className="flex h-[5%] smartPhoneXs:h-[3.5%] smartPhone:h-[3.5%] tabletMini:h-[3%] tablet:h-[3%] items-center justify-between m-3 text-[19px]">
      <div>
        <button onClick={handleBack} className="text-red-500">
          <FaAngleLeft color="white" size={24} />
        </button>
      </div>
      <div>
        <p className="text-center">플레이리스트</p>
      </div>
      <div>
        <button onClick={() => setModalOpen(true)}>
          <FaEllipsisVertical color="white" size={24} />
        </button>
      </div>
      <CustomModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        compressedImage={null}
        playlists={playlists}
        uploadImage={uploadImage}
        token={token}
        playlistName={playlistName}
        musicData={musicData}
        playlistId={playlistId}
        username={username}
      />
    </div>
  );
};
