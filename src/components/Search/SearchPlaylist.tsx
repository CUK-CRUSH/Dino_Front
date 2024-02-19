
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Noimage from "@assets/noimage.jpg";

import { Playlist } from "types/Search/Search";
import { Carousel } from "react-responsive-carousel";

interface SearchPlaylistProps {
  searchResults: Playlist[] | undefined;
}

const SearchPlaylist: React.FC<SearchPlaylistProps> = ({ searchResults }) => {
  return (
    <div className="mt-10">
      <div className="flex justify-between ">
        <span className="flex justify-start">플레이리스트</span>
        <span className="flex justify-end">  더보기</span>
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
          <div className="flex flex-col justify-center items-center" key={playlist.id}>
            <img
              className="cursor-pointer w-[90px] h-[90px] rounded-lg object-cover "
              src={playlist.thumbnailUrl ? playlist.thumbnailUrl : Noimage} // default.jpg는 기본 이미지 경로입니다.
              alt="썸네일"
            />
            <div className="w-[100px] text-left   whitespace-normal break-words">
              <span>{playlist.name}</span></div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default SearchPlaylist;