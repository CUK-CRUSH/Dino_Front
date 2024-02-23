import { getLikeList } from "@api/playlist-controller/playlistControl";
import { useCallback, useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import Noimage from "@assets/noimage.jpg";
import { useRecoilValue } from "recoil";
import { playlistNameState } from "@atoms/Playlist/playlistName";

const UserProfile = ({ user }: any) => {
  const navigate = useNavigate();

  const handleProfileClick = useCallback(() => {
    navigate(`/user/${user.username}`);
  }, [navigate, user.username]);
  return (
    <main className="flex items-center justify-between p-4">
      <div className="flex items-center">
        <img
          src={user.profileImageUrl ? user.profileImageUrl : Noimage}
          alt="프로필 이미지"
          className="w-14 h-14 rounded-full"
        />
        <div className="ml-4">
          <h2 className="text-lg font-bold">{user.username}</h2>
          <p className="text-sm text-gray-500">{user.introduction}</p>
        </div>
      </div>
      <button
        onClick={handleProfileClick} /* 프로필 바로가기 기능 구현 */
        className="px-4 py-2 text-sm bg-black text-white rounded-2xl"
      >
        프로필
      </button>
    </main>
  );
};

const LikeList = () => {
  const navigate = useNavigate();

  const { playlistId } = useParams<{ playlistId: string }>();

  const [users, setUsers] = useState([]);

  const playlistName = useRecoilValue(playlistNameState);

  useEffect(() => {
    const fetchLikeList = async () => {
      try {
        const response = await getLikeList(Number(playlistId));
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLikeList();
  }, [playlistId]);

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);
  return (
    <div className="h-full w-full scrollbar-hide overflow-scroll flex flex-col bg-white text-black font-medium leading-[18px]">
      <header className="flex h-[5%] smartPhoneXs:h-[3.5%] smartPhone:h-[3.5%] tabletMini:h-[3%] tablet:h-[3%] items-center justify-between m-3 text-[19px] border-b-[1px] border-[#EFEFEF]">
        <button
          type="button"
          onClick={handleBack}
          className="text-white self-start mt-2"
        >
          <FaAngleLeft size={24} color="black" />
        </button>
        <p className="text-center mx-auto">{playlistName}</p>
      </header>

      {/* 이만큼 API가져와서 Mapping */}
      {users.length > 0 ? (
        users.map((user: any) => <UserProfile key={user.id} user={user} />)
      ) : (
        <p>좋아요가 없습니다.</p>
      )}

      {/*  */}
    </div>
  );
};

export default LikeList;
