import { useLocation } from 'react-router-dom';
import SearchUserList from './SearchMemberList';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { getSearchMember } from '@api/search-controller/searchController';
import { Member } from 'types/Search/Search';
import OptionHeader from '@components/Layout/optionHeader';
import QueryText from '../part/QueryText';
import InfiniteDiv from '@components/InfiniteDiv/InfiniteDiv';

const SearchMemberDetail: React.FC = () => {
  const location = useLocation();
  const [view, inView] = useInView();

  const [isLast, setLast] = useState<boolean>(false);
  const [page, setPage] = useState(0); // 현재 페이지를 저장할 상태

  // URL 파라미터 읽기
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query');

  // 플레이리스트 데이터
  const [memberData, setMemberdata] = useState<Member[]>([]);

  // API 호출
  const fetchData = async () => {
    try {
      const searchResult = await getSearchMember(query, page);
      setMemberdata([...memberData, ...searchResult.data]); // 기존 데이터에 새로운 데이터를 추가
      setPage((page) => page + 1);
      if (searchResult.data.length < 10) {
        setLast(true);
      } else {
        setLast(false);
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

  return (
    <div className="w-full h-full relative bg-white scrollbar-hide overflow-scroll font-PretendardMedium ">
      <OptionHeader text="검색" />

      {query && <QueryText query={query} />}

      <div className='h-full p-4 '>
        <p className='mb-[12px]'> 유저 </p>

        <SearchUserList
          searchResults={memberData}
          username_fontSize='18px'
          introduction_fontSize='15px'
          size='50px'
          marginY='25px' />
          
        <InfiniteDiv view={view} />

      </div>


    </div>
  )
}

export default SearchMemberDetail;