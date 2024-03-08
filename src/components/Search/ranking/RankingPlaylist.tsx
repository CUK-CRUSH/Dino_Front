import { fetchSearchPlaylistRanking } from '@reducer/Search/getSearchPlaylistRanking';
import { AppDispatch, RootState } from '@store/index';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const RankingPlaylist: React.FC = () => {
  const searchPlaylistsData = useSelector((state: RootState) => state.search.playlists);
  const dispatch = useDispatch<AppDispatch>();
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchSearchPlaylistRanking());
    }
  }, []);

  return (
    <div className="w-full h-full min-h-screen relative flex flex-col bg-white scrollbar-hide overflow-scroll font-PretendardMedium">
       {/* {searchPlaylistsData &&
        playlistData.map((playlist: getPlaylistDTO, index: number) => (
          <PlayList key={playlist.id} playlist={playlist} fontColor='#000' visible={true} />
      ))} */}
    </div>
  )
}

export default RankingPlaylist
