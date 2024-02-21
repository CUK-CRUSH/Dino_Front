import { useLocation } from 'react-router-dom';
import SearchUserList from './SearchMemberList';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import { getSearchMember } from '@api/search-controller/searchController';
import { Member } from 'types/Search/Search';
import Footer from '@components/Layout/footer';

const SearchMemberDetail: React.FC = () => {
  const location = useLocation();
  const [ref, inView] = useInView();

  const [count, setCount] = useState<number>(0);
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
      setCount(memberData.length);
      
      if (count < 5) {
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

  return (
    <div className="w-full h-full relative bg-white scrollbar-hide overflow-scroll font-PretendardMedium ">
      <p className='p-4 text-xl'>'{query}' 검색결과 </p>
      <p className='p-4 '> 유저 </p>

      <SearchUserList
        searchResults={memberData}
        username_fontSize='18px'
        introduction_fontSize='15px'
        size='60px'
        marginY='40px' />
      <div ref={ref} />
      <div className='sticky bottom-0 w-full'>
        <Footer bgColor="white" />
      </div>
    </div>
  )
}

export default SearchMemberDetail;