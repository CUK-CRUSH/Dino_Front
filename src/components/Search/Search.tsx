import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchPlaylist from './playlist/SearchPlaylist';
import SearchMemberList from './member/SearchMemberList';
import OptionHeader from '@components/Layout/optionHeader';
import SearchInput from './part/SearchInput';
import hot from "@assets/Search/hot.svg";
import QueryText from './part/QueryText';
import SearchRecently from './recently/SearchRecently';
import useSearchTerms from '@hooks/useSearchTerms/useSearchTerms';
import useDecodedJWT from '@hooks/useDecodedJWT';
import { AppDispatch, RootState } from '@store/index';
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchMemberRanking } from '@reducer/Search/getSearchMemberRanking';
import { fetchSearchPlaylistRanking } from '@reducer/Search/getSearchPlaylistRanking';
import { fetchSearch } from '@reducer/Search/getSearch';
import NothingSearch from './part/NothingSearch';

const SearchPage: React.FC = () => {
  // id값
  let token = localStorage.getItem('refreshToken');
  let decodedToken = useDecodedJWT(token);
  let userId: string | undefined;
  if (decodedToken) {
    userId = decodedToken.sub;
  } else {
    // decodedToken이 null이면 적절한 기본값을 설정합니다.
    userId = '';
  }
  const { addSearchTerm } = useSearchTerms(userId);

  const location = useLocation();

  const dispatch = useDispatch<AppDispatch>();

  // URL 파라미터 읽기
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query');

  // 검색창 펼치기
  const [openSearchRecently, setOpenSearchRecently] = useState<boolean>(false);

  // 리덕스 상태
  const status = useSelector((state: RootState) => state.searchMemberRanking.status);
  const searchMembersData = useSelector((state: RootState) => state.search.members);
  const searchPlaylistsData = useSelector((state: RootState) => state.search.playlists);
  const searchMemberRankingData = useSelector((state: RootState) => state.searchMemberRanking.searchMemberRanking);
  const searchPlaylistRankingData = useSelector((state: RootState) => state.searchPlaylistRanking.searchPlaylistRanking);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (status === "idle" ) {
      if (!searchPlaylistRankingData.length) {
        dispatch(fetchSearchMemberRanking());
      }
      if (!searchMemberRankingData.length) {
        dispatch(fetchSearchPlaylistRanking());
      }
    }
  }, []);


  useEffect(() => {
    // API 호출
    if (query?.trim() && status === "idle") {
      dispatch(fetchSearch(query?.trim()));
      setOpenSearchRecently(false);
      addSearchTerm(query?.trim());

    }

  }, [location.search, query, dispatch]);

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
            <div className="flex justify-between font-PretendardSemiBold">
              <span className="flex justify-start "><img src={hot} alt='x' /> &nbsp; 인기 플레이리스트</span>
              <Link to={`/ranking/playlist`}><span className="flex justify-end"> 더보기</span></Link>
            </div>
            :
            <div className="flex justify-between font-PretendardSemiBold">
              <span className="flex justify-start ">플레이리스트</span>
              {searchPlaylistsData && searchPlaylistsData.length > 5 ?
                <Link to={`/search/playlist?query=${query}`}><span className="flex justify-end">  더보기</span></Link> : <></>
              }
            </div>
          }

          {/* 쿼리가 없으면 인기플레이리스트 렌더링 */}
          {!query?.trim() ? (
            <SearchPlaylist
              searchResults={searchPlaylistRankingData.slice(0, 5)}
              query={query}
            />
          ) : (
            searchPlaylistsData && searchPlaylistsData.length > 0 ? (
              <SearchPlaylist
                searchResults={searchPlaylistsData.slice(0, 5)}
                query={query}
              />
            ) : (
              <NothingSearch text={query} type={'플레이리스트'} />
            )
          )
          }

          {/* 여백 */}
          <div className='h-[20px]' />

          {/* 유저 */}
          {!query?.trim() ?
            <span className="flex justify-start "><img src={hot} alt='x' /> &nbsp; 인기 유저</span>
            : <p className='font-PretendardSemiBold mb-3'> 유저 </p>
          }

          {!query?.trim() ? (
            <SearchMemberList
              searchResults={searchMemberRankingData.slice(0, 10)}
              username_fontSize='18px'
              introduction_fontSize='15px'
              size='60px'
              marginY='10px'
            />
          ) : (
            searchMembersData && searchMembersData.length > 0 ? (
              <SearchMemberList
                searchResults={searchMembersData.slice(0, 5)}
                username_fontSize='18px'
                introduction_fontSize='15px'
                size='60px'
                marginY='10px'
              />
            ) : (
              <NothingSearch text={query} type={'유저'} />
            )
          )
          }

          {
            !query?.trim() ? (
              <Link to={`/ranking/member`}>
                  {/* <div className="flex justify-center">더보기</div> */}
              </Link>
            ) : (
              searchMembersData && searchMembersData.length > 5 ? (
                <Link to={`/search/member?query=${query}`}>
                  <div className="flex justify-center">더보기</div>
                </Link>
              ) : null
            )
          }
        </main>
      }
    </div>
  );
};

export default SearchPage;

