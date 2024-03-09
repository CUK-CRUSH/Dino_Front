import hot from "@assets/Search/hot.svg";

import { RankingPlaylistComponents } from '@components/Admin/playlist/RankingPlaylist';
import SkeltonPlaylist from '@components/Admin/SkeltonPlaylist';
import OptionHeader from '@components/Layout/optionHeader';
import { useCustomPlaylistMargin } from '@hooks/useCustomMargin/useCustomPlaylistMargin';
import { fetchSearchPlaylistRanking } from '@reducer/Search/getSearchPlaylistRanking';
import { AppDispatch, RootState } from '@store/index';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

const RankingPlaylist: React.FC = () => {
  const [isLoading] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const searchPlaylistRankingData = useSelector((state: RootState) => state.searchPlaylistRanking.searchPlaylistRanking);
  const status = useSelector((state: RootState) => state.searchPlaylistRanking.status);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (status === "idle" && !searchPlaylistRankingData.length) {
      dispatch(fetchSearchPlaylistRanking());
    }
  }, [dispatch]);

  const customMargin = useCustomPlaylistMargin();
  console.log(customMargin)
  return (
    <div className="w-full h-full min-h-screen relative flex flex-col bg-white scrollbar-hide overflow-scroll font-PretendardMedium">
      <OptionHeader />

      <div className='h-full'>

        <p className="flex justify-center "><img src={hot} alt='x' /> &nbsp; 인기 플레이리스트</p>
        <p style={{ marginLeft: customMargin }} className={`py-4 font-PretendardBold underline underline-offset-4	`}>랭킹</p>

        {isLoading && <SkeltonPlaylist customMargin={customMargin} />}

        {searchPlaylistRankingData &&
          searchPlaylistRankingData.map((playlist: any, index: number) => (
            <RankingPlaylistComponents rank={index} key={playlist.id} playlist={playlist} fontColor='#000' />
          ))}

      </div>

    </div>
  )
}

export default RankingPlaylist
