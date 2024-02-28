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
import { useCookies } from 'react-cookie';
import useSearchTerms from '@hooks/useSearchTerms/useSearchTerms';
import useDecodedJWT from '@hooks/useDecodedJWT';

const SearchPage: React.FC = () => {

  const location = useLocation();

  // id값
  const [cookies,,] = useCookies(['accessToken']);
  let token = cookies.accessToken;
  let decodedToken = useDecodedJWT(token);
  let userId: string | undefined;
  if (decodedToken) {
    userId = decodedToken.sub;
  } else {
    // decodedToken이 null이면 적절한 기본값을 설정합니다.
    userId = '';
  }
  // 검색추가하기
  const { addSearchTerm } = useSearchTerms(userId);
  // URL 파라미터 읽기
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query');

  const [searchResults, setSearchResults] = useState<searchResultsDTO>();

  // 검색창 펼치기
  const [openSearchRecently,setOpenSearchRecently] = useState<boolean>(false);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    // API 호출
    const fetchData = async () => {
      try {
        const searchResult = await getSearch(query?.trim());
        if(searchResult.status === 200 && userId !== '' ){
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
      <OptionHeader text="검색" openSearchRecently={openSearchRecently} setOpenSearchRecently={setOpenSearchRecently}/>
      <SearchInput setOpenSearchRecently={setOpenSearchRecently} />
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
