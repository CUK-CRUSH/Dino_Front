import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRecommendation } from "@api/Recommendation/recommendationControl";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Noimage from "@assets/noimage.jpg";
import { useCookies } from "react-cookie";

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
        <Carousel
          showArrows={true}
          swipeable={true}
          centerMode={true}
          centerSlidePercentage={30}
          showThumbs={false}
          showStatus={false}
          autoPlay={true}
          transitionTime={1000}
          infiniteLoop={false}
          showIndicators={true}
        >
          {data.map((item) => (
            <div
              className="mr-3 cursor-pointer"
              key={item.id}
              onClick={() => handleOnClick(item.username, item.id)}
            >
              <img
                className="cursor-pointer w-[105px] h-[105px] rounded-lg object-cover"
                src={item.thumbnailUrl ? item.thumbnailUrl : Noimage} // default.jpg는 기본 이미지 경로입니다.
                alt={item.playlistName}
              />
              <p>{item.playlistName}</p>
            </div>
          ))}
        </Carousel>
      ) : (
        <div>추천 플레이리스트가 없습니다.</div>
      )}
    </div>
  );
};

export default Recommendation;
