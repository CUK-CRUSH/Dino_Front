import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation, Mousewheel } from 'swiper/modules';
import { getRecommendation } from "@api/Recommendation/recommendationControl";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Noimage from "@assets/noimage.jpg";
import { useCookies } from "react-cookie";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

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
      <div className="flex justify-center flex-col ">
        <p className="mb-2">✨랜덤 플레이리스트</p>
        <div style={{ width: '100%'}} className={"px-2.5"}>
        {data.length > 0 ? (
            <Swiper
                modules={[Pagination, Navigation, Mousewheel]}
                grabCursor={true}
                slidesPerView={3.5}
                spaceBetween={10}
                navigation
                loop={false}
                mousewheel
            >
              {data.map((item) => (
                  <SwiperSlide key={item.id}>
                    <div
                        className="mr-3 cursor-pointer w-[5.5rem] h-[10rem] flex flex-col items-center"
                        onClick={() => handleOnClick(item.username, item.id)}
                    >
                      <div>
                        <img
                            className="w-[5.5rem] h-[5.5rem] cursor-pointer rounded-lg object-cover"
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
            <div>랜덤 플레이리스트가 없습니다.</div>
        )}
        </div>
      </div>
  );
};

export default Recommendation;
