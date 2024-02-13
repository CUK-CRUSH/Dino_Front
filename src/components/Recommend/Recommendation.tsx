import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRecommendation } from "@api/Recommendation/recommendationControl";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import NoImage from "@assets/Kakao.svg";

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

  useEffect(() => {
    const fetchData = async () => {
      const res = await getRecommendation();
      setData(res.data);
    };

    fetchData();
  }, []);

  return (
    <div className="flex justify-center flex-col mx-5 w-[390px]">
      <p className="mb-2">✨추천 플레이리스트</p>
      <Carousel
        showArrows={false}
        centerMode={true}
        centerSlidePercentage={30}
        showThumbs={false}
        showStatus={false}
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        interval={2000}
      >
        {data.map((item) => (
          <div
            className="mr-3"
            key={item.id}
            onClick={() => navigate(`/user/${item.username}/${item.id}`)}
          >
            <img
              className="cursor-pointer"
              src={item.thumbnailUrl || NoImage} // default.jpg는 기본 이미지 경로입니다.
              alt={item.playlistName}
            />
            <p>{item.playlistName}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Recommendation;
