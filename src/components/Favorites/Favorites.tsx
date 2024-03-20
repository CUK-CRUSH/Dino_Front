import { getFavoritesPlayList } from "@api/playlist-controller/playlistControl";
import { PlayList } from "@components/Admin/playlist/PlayList";
import SkeltonPlaylist from "@components/Admin/SkeltonPlaylist";
import InfiniteDiv from "@components/InfiniteDiv/InfiniteDiv";
import OptionHeader from "@components/Layout/optionHeader";
import { useCustomPlaylistMargin } from "@hooks/useCustomMargin/useCustomPlaylistMargin";
import { fetchFavoriteList, favoriteListSlice } from "@reducer/Favorites/favorites";
import { AppDispatch, RootState } from "@store/index";

import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useInView } from "react-intersection-observer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getPlaylistDTO } from "types/Admin";

const FavoritesPage: React.FC = () => {
  const [view, inView] = useInView();
  const [cookies] = useCookies();
  const token = cookies.accessToken;

  // 플레이리스트 데이터
  const dispatch = useDispatch<AppDispatch>();

  const favoriteList = useSelector((state: RootState) => state.favorite.favoriteList);
  const currentPage = useSelector(
    (state: RootState) => state.favorite.currentPage
  );
  const isLast = useSelector((state: RootState) => state.favorite.isLast);
  const status = useSelector((state: RootState) => state.favorite.status);

  useEffect(() => {
    if (status === "idle" && inView && !isLast) {
      dispatch(fetchFavoriteList({ token: token, page:0 }));

    }
    const delay = 200;
    const timeoutId = setTimeout(() => {
    }, delay);
    return () => clearTimeout(timeoutId);
  }, [status, dispatch,  currentPage, inView, isLast]);

  // skelton margin
  const customMargin = useCustomPlaylistMargin();

  return (
    <div className="h-full min-h-screen w-full scrollbar-hide overflow-scroll flex  flex-col bg-white text-black text-[15px] font-medium leading-[18px]">
      <OptionHeader text='좋아요한 목록' />

      <div className="inline">
        {favoriteList &&
          favoriteList.map((playlist: getPlaylistDTO, index: number) => (
            <PlayList key={playlist.id} playlist={playlist} fontColor='#000' visible={true} />
          ))}
      </div>
      <InfiniteDiv view={view} />

    </div>
  );
};

export default FavoritesPage;
