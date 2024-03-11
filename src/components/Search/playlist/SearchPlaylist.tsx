import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import defaultImage from "@assets/PlayListImage/default.svg";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Playlist } from "types/Search/Search";
import { useNavigate } from "react-router-dom";
import { Pagination } from 'swiper/modules';
import { Navigation, Mousewheel } from 'swiper/modules';

interface SearchPlaylistProps {
  searchResults: Playlist[] | undefined;
  query: string | null;
}

const SearchPlaylist: React.FC<SearchPlaylistProps> = ({ searchResults, query }) => {

  const navigate = useNavigate();

  const handleNavigate = (username: string, id: string) => {
    navigate(`/user/${username}/${id}`);
  }
  return (
    <div className="py-4">

      <Swiper
        modules={[Pagination, Navigation, Mousewheel]}
        grabCursor={true}
        slidesPerView={3.5}
        spaceBetween={10}
        navigation
        loop={false}
        mousewheel
      >
        {searchResults && searchResults.map((playlist) => (
          <SwiperSlide key={playlist.id}>

            <div className="flex flex-col justify-center items-center w-[105px] cursor-pointer" key={playlist.id} onClick={() => handleNavigate(playlist.username, playlist.id)}>
              <img
                className="cursor-pointer w-[90px] h-[90px] rounded-lg object-cover "
                src={playlist.thumbnailUrl ? playlist.thumbnailUrl : defaultImage} // default.jpg는 기본 이미지 경로입니다.
                alt="썸네일"
              />
              <div className="w-[100px] text-left whitespace-normal break-words">
                <span>{playlist.playlistName}</span></div>
            </div>
          </SwiperSlide>
        ))}

      </Swiper>
    </div>
  );
};

export default SearchPlaylist;