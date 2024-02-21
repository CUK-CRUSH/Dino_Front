import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchPlaylist from './SearchPlaylist';
import { getSearch } from '@api/search-controller/searchController';
import { searchResultsDTO } from 'types/Search/Search';
import SearchUserList from './SearchMemberList';

const SearchPage: React.FC = () => {
  const location = useLocation();

  // URL 파라미터 읽기
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query');

  const [searchResults, setSearchResults] = useState<searchResultsDTO>();

  useEffect(() => {
    // API 호출
    const fetchData = async () => {
      try {
        const searchResult = await getSearch(query);
        setSearchResults(searchResult);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [location.search, query]);

  return (
    <div className="w-full h-full relative bg-white flex flex-col justify-start p-4 font-PretendardMedium">

      <p className='text-xl'>'{query}' 검색결과</p>

      <SearchPlaylist
        searchResults={searchResults?.data.playlists}
        query={query}
      />
      <div className='h-[50px]' />

      <p className=' mb-3'> 유저 </p>

      <SearchUserList
        searchResults={searchResults?.data.members}
        username_fontSize='18px'
        introduction_fontSize='15px'
        size='60px'
        marginY='10px'
      />
      <Link to={`/search/member?query=${query}`}>
        <div className="flex justify-center">더보기</div>
      </Link>
    </div>
  )
}

export default SearchPage
