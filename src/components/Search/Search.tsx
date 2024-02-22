import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchPlaylist from './SearchPlaylist';
import { getSearch } from '@api/search-controller/searchController';
import { searchResultsDTO } from 'types/Search/Search';
import SearchMemberList from './SearchMemberList';
import OptionHeader from '@components/Layout/optionHeader';
import SearchInput from './SearchInput';
import hot from "@assets/Search/hot.svg";
import NothingSearch from './NothingSearch';
import QueryText from './QueryText';

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
    <div className="w-full h-full relative bg-white flex flex-col justify-start scrollbar-hide overflow-scroll font-PretendardMedium">
      <OptionHeader text="검색" />
      <SearchInput />
      <main className='p-4'>
        {query && <QueryText query={query} />}

        {/* 플레이리스트 */}
        {!query ?
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
        {!query ?
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

        {searchResults && searchResults.data.members.length > 5 ?
          <Link to={`/search/member?query=${query}`}>
            <div className="flex justify-center">더보기</div>
          </Link>
          : <></>
        }
      </main>
    </div>
  );
};

export default SearchPage;
