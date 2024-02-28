import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchPlaylist from './playlist/SearchPlaylist';
import { getSearch } from '@api/search-controller/searchController';
import { searchResultsDTO } from 'types/Search/Search';
import SearchMemberList from './member/SearchMemberList';
import OptionHeader from '@components/Layout/optionHeader';
import SearchInput from './part/SearchInput';
import hot from "@assets/Search/hot.svg";
import NothingSearch from './part/NothingSearch';
import QueryText from './part/QueryText';
import SearchRecently from './recently/SearchRecently';

const SearchPage: React.FC = () => {
// 검색어와 검색 날짜를 로컬 스토리지에 추가하는 함수
const addSearchTerm = (term: string | undefined) => {
  let searchTerms = localStorage.getItem('searchTerms');
  
  if (!searchTerms) {
    searchTerms = '[]';
  }

  const terms = JSON.parse(searchTerms);
  const date = new Date().toISOString(); // 현재 날짜와 시간을 ISO 형식으로 가져옵니다.

  // 이미 저장된 같은 검색어가 있는지 확인하고, 있다면 삭제
  const existingIndex = terms.findIndex((item: any) => item.term === term);
  if (existingIndex > -1) {
    terms.splice(existingIndex, 1);
  }

  // 새로운 검색어를 맨 앞에 추가
  terms.unshift({ term, date });

   // 검색어가 10개 이상이면 가장 오래된 검색어를 삭제
   if (terms.length > 10) {
    terms.pop();
  }

  localStorage.setItem('searchTerms', JSON.stringify(terms));
}

// 로컬 스토리지에서 검색어와 검색 날짜의 목록을 가져오는 함수
// const getSearchTerms = (): { term: string; date: string }[] => {
//   let searchTerms = localStorage.getItem('searchTerms');

//   if (!searchTerms) {
//     return [];
//   }

//   return JSON.parse(searchTerms);
// }

  const location = useLocation();

  // URL 파라미터 읽기
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query');

  const [searchResults, setSearchResults] = useState<searchResultsDTO>();

  // 검색창 펼치기
  const [openSearchRecently,setOpenSearchRecently] = useState<boolean>(false);
  useEffect(() => {
    // API 호출
    const fetchData = async () => {
      try {
        const searchResult = await getSearch(query?.trim());
        if(searchResult.status === 200){
          addSearchTerm(query?.trim());
        }
        
        setSearchResults(searchResult);
        setOpenSearchRecently(false);
      } catch (error) {
        console.error(error);
      }
    };
    if(query?.trim()){
      fetchData();
    }
    
  }, [location.search, query]);

  return (
    <div className="w-full h-full relative bg-white flex flex-col justify-start scrollbar-hide overflow-scroll font-PretendardMedium">
      <OptionHeader text="검색" />
      <SearchInput setOpenSearchRecently={setOpenSearchRecently}/>
      {openSearchRecently ? 
      <SearchRecently />
      :
      <main className='p-4'>
        {query?.trim() && <QueryText query={query} />}

        {/* 플레이리스트 */}
        {!query?.trim() ?
          <span className="flex justify-start "><img src={hot} alt='x' /> &nbsp; 인기 플레이리스트</span>
          :
          <div className="flex justify-between font-PretendardSemiBold">
            <span className="flex justify-start ">플레이리스트</span>
            {searchResults && searchResults.data.playlists.length > 4 ?
              <Link to={`/search/playlist?query=${query}`}><span className="flex justify-end">  더보기</span></Link> : <></>
            }
          </div>
        }

        {!searchResults?.data.playlists.length ? <NothingSearch text='플레이리스트' /> :
          <SearchPlaylist
            searchResults={searchResults?.data.playlists}
            query={query}
          />
        }

        {/* 여백 */}
        <div className='h-[50px]' />

        {/* 유저 */}
        {!query?.trim() ?
          <span className="flex justify-start "><img src={hot} alt='x' /> &nbsp; 인기 유저</span>
          : <p className='font-PretendardSemiBold mb-3'> 유저 </p>
        }

        {!searchResults?.data.members.length ? <NothingSearch text='유저' /> :
          <SearchMemberList
            searchResults={searchResults?.data.members}
            username_fontSize='18px'
            introduction_fontSize='15px'
            size='60px'
            marginY='10px'
          />
        }

        {searchResults && searchResults.data.members.length >= 10 ?
          <Link to={`/search/member?query=${query}`}>
            <div className="flex justify-center">더보기</div>
          </Link>
          : <></>
        }
      </main>
      }
    </div>
  );
};

export default SearchPage;
