
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Noimage from "@assets/noimage.jpg";

import { Playlist } from "types/Search/Search";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import hot from "@assets/Search/hot.svg";

interface SearchPlaylistProps {
  searchResults: Playlist[] | undefined;
  query: string | null;
}

const SearchPlaylist: React.FC<SearchPlaylistProps> = ({ searchResults, query }) => {
  return (
    <div className="mt-[15px]">

      {/* 커모넌트화 */}
      <div className="flex justify-between font-PretendardSemiBold">
        {!query ? 
        <span className="flex justify-start "><img src={hot} /> &nbsp; 인기 플레이리스트</span>
        :
        <span className="flex justify-start ">플레이리스트</span>
        }
        {searchResults?.length ?
          <Link to={`/search/playlist?query=${query}`}><span className="flex justify-end">  더보기</span></Link> : <></>
        }

      </div>

      <Carousel
        showArrows={true} // 이 부분을 true로 바꿔주세요.
        centerMode={true}
        centerSlidePercentage={40}
        showThumbs={false}
        showStatus={false}
        autoPlay={false}
        infiniteLoop={false}
        showIndicators={false}
        interval={2000}
        swipeScrollTolerance={50}
        className="mt-5"
      >
        {searchResults && searchResults.map((playlist) => (
          <div className="flex flex-col justify-center items-center w-[105px]" key={playlist.id}>
            <img
              className="cursor-pointer w-[90px] h-[90px] rounded-lg object-cover "
              src={playlist.thumbnailUrl ? playlist.thumbnailUrl : Noimage} // default.jpg는 기본 이미지 경로입니다.
              alt="썸네일"
            />
            <div className="w-[100px] text-left whitespace-normal break-words">
              <span>{playlist.playlistName}</span></div>
          </div>
        ))}

      </Carousel>
    </div>
  );
};

export default SearchPlaylist;