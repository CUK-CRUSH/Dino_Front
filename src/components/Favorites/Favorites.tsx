import { getFavoritesPlayList } from "@api/playlist-controller/playlistControl";
import { PlayList } from "@components/Admin/Button/PlayList";

import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { FaAngleLeft } from "react-icons/fa6";
import { useInView } from "react-intersection-observer";
import { useNavigate, useParams } from "react-router-dom";
import { getPlaylistDTO } from "types/Admin";

const FavoritesPage: React.FC = () => {
  const navigate = useNavigate();
  const { username } = useParams<{ username: string | undefined }>();
  const [ref, inView] = useInView();
  const [count, setCount] = useState<number>(0);
  const [isLast, setLast] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0); // 현재 페이지를 저장할 상태
  const [cookies] = useCookies();
  const token = cookies.accessToken;

  // 플레이리스트 데이터
  const [playlistData, setPlaylistdata] = useState<getPlaylistDTO[]>([]);

  // API 호출
  const fetchData = async () => {
    try {
      const playlistResult = await getFavoritesPlayList(token,page);
      setPlaylistdata(playlistResult.data); // 기존 데이터에 새로운 데이터를 추가
      setPage((page) => page + 1);
      setCount(playlistData.length);
      
      if (count < 8) {
        setLast(false);
      } else {
        setLast(true);
      }

    } catch (error) {
      console.error(error);
    }
  };
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (inView && !isLast) {

      fetchData();
    }
  }, [inView]);

  const handleBack = useCallback(() => {
    navigate(`/user/${username}`);
  }, [navigate, username]);

  return (
    <div className="h-full min-h-screen w-full scrollbar-hide overflow-scroll flex  flex-col bg-white text-black text-[15px] font-medium leading-[18px]">
      <header className="relative h-[5%] smartPhoneXs:h-[3.5%] smartPhone:h-[3.5%] tabletMini:h-[3%] tablet:h-[3%] m-3 text-[19px] ">
        <button
          type="button"
          onClick={handleBack}
          className="text-white self-start mt-2"
        >
          <FaAngleLeft size={24} color="black" />
        </button>
        <div className="absolute top-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-PretendardMedium">

        <span className="">
        좋아요 목록
        </span>
        </div>
      </header>
      
      <div className="inline">
      {playlistData &&
        playlistData.map((playlist: getPlaylistDTO, index: number) => (
          <PlayList key={playlist.id} playlist={playlist} fontColor='#000' visible={true} />
        ))}
        </div>
        <div ref={ref} />

    </div>
  );
};

export default FavoritesPage;
