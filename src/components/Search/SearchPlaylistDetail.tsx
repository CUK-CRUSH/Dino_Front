import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getSearchPlaylist } from '@api/search-controller/searchController';
import { PlayList } from '@components/Admin/Button/PlayList';
import { getPlaylistDTO } from 'types/Admin';
import { useInView } from 'react-intersection-observer';
import Footer from '@components/Layout/footer';

const SearchPlaylistDetail: React.FC = () => {
  const location = useLocation();
  const [ref, inView] = useInView();

  const [page, setPage] = useState(0); // 현재 페이지를 저장할 상태

  // URL 파라미터 읽기
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query');

  // 플레이리스트 데이터
  const [playlistData, setPlaylistdata] = useState<getPlaylistDTO[]>([]);
  
    // API 호출
    const fetchData = async () => {
      try {
        const searchResult = await getSearchPlaylist(query,page);
        setPlaylistdata([...playlistData, ...searchResult.data]); // 기존 데이터에 새로운 데이터를 추가
        setPage((page) => page + 1)
        console.log(searchResult)
      } catch (error) {
        console.error(error);
      }
    };

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
   if (inView) {
    
   fetchData();
    }
    }, [inView]);

  return (
    <div className="w-full h-full relative bg-white scrollbar-hide overflow-scroll font-PretendardMedium">
      <p className='p-4 text-xl'>'{query}' 검색결과 </p>
      <p className='p-4'> 플레이리스트 </p>
      {playlistData &&
          playlistData.map((playlist: getPlaylistDTO, index: number) => (
            <PlayList key={playlist.id} playlist={playlist} fontColor='#000' visible={true} />
          ))}
  	<div ref={ref} />
    <div className='sticky bottom-0 w-full'>
    <Footer bgColor="white" />
    </div>

    </div>
      )
}

export default SearchPlaylistDetail
