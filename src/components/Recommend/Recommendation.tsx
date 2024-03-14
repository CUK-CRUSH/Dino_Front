import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navigation, Mousewheel } from "swiper/modules";
import { getRecommendation } from "@api/Recommendation/recommendationControl";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import defaultImage from "@assets/PlayListImage/default.svg";
import { useCookies } from "react-cookie";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

interface PlayListDTO {
  id: number;
  playlistName: string;
  thumbnailUrl: string | null;
  numberOfMusics: number;
  username: string;
}

const Recommendation = ({ tutorialStep }: { tutorialStep: string | null }) => {
  const [data, setData] = useState<PlayListDTO[]>([]);

  const navigate = useNavigate();
  const { playlistId } = useParams<{ playlistId: string }>();

  const [cookies] = useCookies(["accessToken"]);
  const token = cookies.accessToken;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await getRecommendation(token, Number(playlistId));
  //     setData(res.data);
  //   };

  //   fetchData();
  // }, [token, setData, playlistId]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getRecommendation(token, Number(playlistId));
      return res.data;
    };

    fetchData().then((data) => setData(data));
  }, [token, playlistId]);

  const handleOnClick = (username: string, id: number) => {
    navigate(`/user/${username}/${id}`);
  };

  return (
    <div className="flex justify-center flex-col ">
      <p className="mb-2">✨랜덤 플레이리스트</p>
      <div style={{ width: "100%" }} className={"px-2.5"}>
        {data.length > 0 ? (
          <>
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
                        src={
                          item.thumbnailUrl ? item.thumbnailUrl : defaultImage
                        }
                        alt={item.playlistName}
                      />
                      <div
                        style={{
                          wordWrap: "break-word",
                          wordBreak: "break-all",
                        }}
                      >
                        <h3 className="text-start mt-2 overflow-hidden text-overflow-ellipsis">
                          {item.playlistName}
                        </h3>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            {tutorialStep === "env" && (
              <>
                <div className="absolute text-[14px] w-[300px] h-[60px] bottom-48 right-3 mt-1 z-20 bg-white text-black p-2 rounded-md font-bold flex items-center justify-center">
                  <div className="text-start">
                    <p>랜덤으로 추천되는 플레이리스트를 확인해보세요!</p>
                  </div>
                </div>
                <div className="w-6 h-6 bg-white absolute bottom-[180px] right-14 z-[19] transform rotate-45"></div>
              </>
            )}
          </>
        ) : (
          <div>랜덤 플레이리스트가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default Recommendation;
