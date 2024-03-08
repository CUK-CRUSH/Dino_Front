import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { playlistNameState } from "@atoms/Playlist/playlistName";
import { useInView } from "react-intersection-observer";
import InfiniteDiv from "@components/InfiniteDiv/InfiniteDiv";
import UserProfile from "./UserProfile";
import OptionHeader from "@components/Layout/optionHeader";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store/index";
import { fetchLikeList } from "@reducer/Likes/likeList";
import SkeletonLikes from "./Skeleton/LikeSkeleton";

const LikeList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { playlistId } = useParams<{ playlistId: string }>();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const likeList = useSelector((state: RootState) => state.likeList.likeList);
  const currentPage = useSelector(
    (state: RootState) => state.likeList.currentPage
  );
  const isLast = useSelector((state: RootState) => state.likeList.isLast);
  const status = useSelector((state: RootState) => state.likeList.status);

  const [view, inView] = useInView();

  const playlistName = useRecoilValue(playlistNameState);

  useEffect(() => {
    if (status === "idle" && inView && !isLast) {
      dispatch(
        fetchLikeList({ playlistId: Number(playlistId), page: currentPage })
      );
    }
    const delay = 200;
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, delay);
    return () => clearTimeout(timeoutId);
  }, [status, dispatch, playlistId, currentPage, inView, isLast]);

  return (
    <div className="h-full w-full scrollbar-hide overflow-scroll flex flex-col bg-white text-black font-medium leading-[18px]">
      <OptionHeader text={playlistName} />
      {isLoading ? (
        <SkeletonLikes customMargin={10} />
      ) : likeList.length > 0 ? (
        likeList.map((user: any) => <UserProfile key={user.id} user={user} />)
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
