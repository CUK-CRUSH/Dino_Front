import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRecommendation } from "@api/Recommendation/recommendationControl";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Noimage from "@assets/noimage.jpg";
import { useCookies } from "react-cookie";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import {EffectCoverflow, Mousewheel, Navigation} from 'swiper/modules';

interface PlayListDTO {
  id: number;
  playlistName: string;
  thumbnailUrl: string | null;
  numberOfMusics: number;
  username: string;
}

const Recommendation = () => {
  const [data, setData] = useState<PlayListDTO[]>([]);

  const navigate = useNavigate();

  const [cookies] = useCookies(["accessToken"]);
  const token = cookies.accessToken;

  useEffect(() => {
    const fetchData = async () => {
      const res = await getRecommendation(token);
      setData(res.data);
    };

    fetchData();
  }, [token, setData]);

  const handleOnClick = (username: string, id: number) => {
    navigate(`/user/${username}/${id}`);
    window.location.reload();
  };


  return (
      <div className="flex justify-center flex-col mx-5 ">
        <p className="mb-2">✨추천 플레이리스트</p>
        {data.length > 0 ? (
            <Swiper
                modules={[Pagination]}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={4}
                slidesOffsetBefore={0}
                initialSlide={0} // Set the first slide as the initial slide
            >
              {data.map((item) => (
                  <SwiperSlide key={item.id}>
                    <div
                        className="mr-3 cursor-pointer w-[6rem] h-[10rem] flex flex-col items-center"
                        onClick={() => handleOnClick(item.username, item.id)}
                    >
                      <div>
                        <img
                            className="w-[6rem] h-[6rem] cursor-pointer rounded-lg object-cover"
                            src={item.thumbnailUrl ? item.thumbnailUrl : Noimage}
                            alt={item.playlistName}
                        />
                        <div style={{wordWrap: 'break-word', wordBreak: 'break-all'}}>
                          <h3 className="text-center mt-2 overflow-hidden text-overflow-ellipsis">{item.playlistName}</h3>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
              ))}
            </Swiper>
        ) : (
            <div>추천 플레이리스트가 없습니다.</div>
        )}
      </div>
  );
};

export default Recommendation;
