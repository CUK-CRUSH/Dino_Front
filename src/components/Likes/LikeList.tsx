import { getLikeList } from "@api/playlist-controller/playlistControl";
import { useCallback, useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { playlistNameState } from "@atoms/Playlist/playlistName";
import { useInView } from "react-intersection-observer";
import InfiniteDiv from "@components/InfiniteDiv/InfiniteDiv";
import UserProfile from "./UserProfile";

const LikeList = () => {
  const navigate = useNavigate();

  const { playlistId } = useParams<{ playlistId: string }>();

  const [users, setUsers] = useState<any[]>([]);
  const [view, inView] = useInView();

  const [isLast, setLast] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);

  const playlistName = useRecoilValue(playlistNameState);

  const fetchLikeList = async () => {
    try {
      const response = await getLikeList(Number(playlistId), page);
      setUsers((prevUsers) => [...prevUsers, ...response.data]);

      setPage((page) => page + 1);

      if (response.data.length < 15) {
        setLast(true); // 마지막 페이지의 항목 수를 사용하여 isLast를 설정
      } else {
        setLast(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (inView && !isLast) {
      fetchLikeList();
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [inView]);

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
        <div className="flex flex-grow items-center justify-center">
          <p className="text-[20px] text-center font-bold">
            좋아요가 없습니다.
          </p>
        </div>
      )}
      <div>
        <InfiniteDiv view={view} />
      </div>
    </div>
  );
};

export default LikeList;
