import { PlayList } from "@components/Admin/playlist/PlayList";
import OptionHeader from "@components/Layout/optionHeader";
import { fetchFavoriteList } from "@reducer/Favorites/favorites";
import { AppDispatch, RootState } from "@store/index";

import { useEffect, useRef} from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getPlaylistDTO } from "types/Admin";

const FavoritesPage: React.FC = () => {
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef(null); // 마지막 요소를 참조하기 위한 ref
  const [cookies] = useCookies(['accessToken']);
  const token = cookies.accessToken;

  const dispatch = useDispatch<AppDispatch>();
  const favoriteList = useSelector((state: RootState) => state.favorite.favoriteList);
  const currentPage = useSelector((state: RootState) => state.favorite.currentPage);
  const isLast = useSelector((state: RootState) => state.favorite.isLast);
  const status = useSelector((state: RootState) => state.favorite.status);
  useEffect(() => {

    // 현재 상태가 "idle"이고 마지막 페이지가 아닐 때 실행
    if (status === "idle" && !isLast) {
      // 이미 observer가 존재한다면 연결을 끊음
      if (observer.current) observer.current.disconnect();
      
      // 새로운 IntersectionObserver를 생성하여 할당
      observer.current = new IntersectionObserver((entries) => {
        // 관찰 대상이 교차 영역에 들어오면 즐겨찾기 목록을 가져옴
        if (entries[0].isIntersecting) {
          dispatch(fetchFavoriteList({ page: currentPage, token: token }));
        }
      });
  
      // lastElementRef가 존재하면 해당 요소를 관찰 대상으로 설정
      if (lastElementRef.current) {
        observer.current.observe(lastElementRef.current)
        
      };
    }
  
    // 컴포넌트가 언마운트 될 때 observer를 정리
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLast,token]);

  return (
    <div className="h-full min-h-screen w-full scrollbar-hide overflow-scroll flex flex-col bg-white text-black text-[15px] font-medium leading-[18px]">
      <OptionHeader text='좋아요한 목록' />

      <div className="inline">
        {favoriteList &&
          favoriteList.map((playlist: getPlaylistDTO, index: number) => (
            <PlayList key={`${playlist.id}-${index}`} playlist={playlist} fontColor='#000' visible={true} />
            ))}
        {/* 마지막 요소에 ref를 설정하여 무한 스크롤 구현 */}
        <div ref={lastElementRef} style={{ height: "20px" }}></div> 
      </div>
    </div>
  );
};

export default FavoritesPage;