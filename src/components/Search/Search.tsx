import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SearchPlaylist from './SearchPlaylist';
import SearchUser from './SearchUser';
import { getSearch } from '@api/search-controller/searchController';
import { searchResultsDTO } from 'types/Search/Search';

const SearchnPage: React.FC = () => {
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
        console.log(searchResult)
        setSearchResults(searchResult);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [location.search,query]);

  return (
    <div className="w-full h-full relative bg-white flex flex-col justify-start p-4 font-PretendardMedium">

      <p className='text-xl'>'{query}' 검색결과</p>


      <SearchPlaylist
        searchResults={searchResults?.data.playlists} />

      <SearchUser
        searchResults={searchResults?.data.members} />
        
    </div>
  )
}

export default SearchnPage
