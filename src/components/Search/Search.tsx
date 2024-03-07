import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchPlaylist from './playlist/SearchPlaylist';
import { getSearch, getSearchMemberRanking, getSearchPlaylistRanking } from '@api/search-controller/searchController';
import { Member, Playlist, searchResultsDTO } from 'types/Search/Search';
import SearchMemberList from './member/SearchMemberList';
import OptionHeader from '@components/Layout/optionHeader';
import SearchInput from './part/SearchInput';
import hot from "@assets/Search/hot.svg";
import QueryText from './part/QueryText';
import SearchRecently from './recently/SearchRecently';
import { useCookies } from 'react-cookie';
import useSearchTerms from '@hooks/useSearchTerms/useSearchTerms';
import useDecodedJWT from '@hooks/useDecodedJWT';
import { AppDispatch, RootState } from '@store/index';
import {   useDispatch, useSelector } from "react-redux";
import { fetchSearchMemberRanking } from '@reducer/Search/getSearchMemberRanking';
import { fetchSearchPlaylistRanking } from '@reducer/Search/getSearchPlaylistRanking';

const SearchPage: React.FC = () => {

  const location = useLocation();

  // id값
  const [cookies, ,] = useCookies(['accessToken']);
  let token = cookies.accessToken;
  let decodedToken = useDecodedJWT(token);
  let userId: string | undefined;
  if (decodedToken) {
    userId = decodedToken.sub;
  } else {
    // decodedToken이 null이면 적절한 기본값을 설정합니다.
    userId = '';
  }

  const dispatch = useDispatch<AppDispatch>();
  
  // 검색추가하기
  const { addSearchTerm } = useSearchTerms(userId);
  // URL 파라미터 읽기
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query');

  // 인기 플리 & 유저
  const [rankingMemberResult, setRankingMemberResults] = useState<Member[]>();
  const [rankingPlaylistResult, setRankingPlaylistResults] = useState<Playlist[]>();

  // 검색 결과
  const [searchResults, setSearchResults] = useState<searchResultsDTO>();

  // 검색창 펼치기
  const [openSearchRecently, setOpenSearchRecently] = useState<boolean>(false);

  // 리덕스 상태
  const status = useSelector((state : RootState) => state.searchMemberRanking.status);
  const searchMemberRankingData = useSelector((state : RootState) => state.searchMemberRanking.searchMemberRanking);
  const searchPlaylistRankingData = useSelector((state : RootState) => state.searchPlaylistRanking.searchPlaylistRanking);


  useEffect(() => {
    if (status === "idle"){
    dispatch(fetchSearchMemberRanking());
    dispatch(fetchSearchPlaylistRanking());
  }
  }, []);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    // API 호출
    const fetchData = async () => {
      try {
        const searchResult = await getSearch(query?.trim());

        if (searchResult.status === 200 && userId !== '') {
          addSearchTerm(query?.trim());
        }
        setSearchResults(searchResult);
        setOpenSearchRecently(false);
      } catch (error) {
        console.error(error);
      }
    };
    // 띄어쓰기 방지.
    if (query?.trim()) {
      fetchData();
    }

  }, [location.search, query]);

  return (
    <div className="w-full h-full relative bg-white flex flex-col justify-start scrollbar-hide overflow-scroll font-PretendardMedium">
      <OptionHeader text="검색" openSearchRecently={openSearchRecently} setOpenSearchRecently={setOpenSearchRecently} />
      
      {/* 검색창 */}
      <SearchInput setOpenSearchRecently={setOpenSearchRecently} />
      
      {openSearchRecently ?
        <SearchRecently setOpenSearchRecently={setOpenSearchRecently} />
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

          {/* 쿼리가 없으면 인기플레이리스트 렌더링 */}
          {!query?.trim() ?
            <SearchPlaylist
              searchResults={searchPlaylistRankingData}
              query={query}
            /> :
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

          {!query?.trim() ?
            <SearchMemberList
              searchResults={searchMemberRankingData}
              username_fontSize='18px'
              introduction_fontSize='15px'
              size='60px'
              marginY='10px'
            />
            :
            <SearchMemberList
              searchResults={searchResults?.data.members}
              username_fontSize='18px'
              introduction_fontSize='15px'
              size='60px'
              marginY='10px'
            />
          }

          {searchResults && searchResults.data.members.length >= 8 ?
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

