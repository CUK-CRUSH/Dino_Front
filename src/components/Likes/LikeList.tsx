import { getLikeList } from "@api/playlist-controller/playlistControl";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { playlistNameState } from "@atoms/Playlist/playlistName";
import { useInView } from "react-intersection-observer";
import InfiniteDiv from "@components/InfiniteDiv/InfiniteDiv";
import UserProfile from "./UserProfile";
import OptionHeader from "@components/Layout/optionHeader";

const LikeList = () => {
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

  return (
    <div className="h-full w-full scrollbar-hide overflow-scroll flex flex-col bg-white text-black font-medium leading-[18px]">
      <OptionHeader text={playlistName} />
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
