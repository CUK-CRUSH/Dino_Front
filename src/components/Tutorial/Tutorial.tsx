import React, { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import TutorialCharacter from "@assets/Tutorial/Character.svg";
import One from "@assets/Tutorial/1.svg";
import Two from "@assets/Tutorial/2.svg";
import Three from "@assets/Tutorial/3.svg";
import Four from "@assets/Tutorial/4.svg";
import Five from "@assets/Tutorial/5.svg";
import Six from "@assets/Tutorial/6.svg";
import { useCookies } from "react-cookie";
import useWindowSizeCustom from "@hooks/useCustomMargin/useWindowSizeCustom";

interface TutorialProps {
  username: string;
}

const Tutorial: React.FC<TutorialProps> = ({ username }) => {
  const [isVisible, setIsVisible] = useState(true);

  const [cookies, setCookie] = useCookies(["tutorial"]);
  const [token] = useCookies(["accessToken"]);
  const accessToken = token.accessToken;
  const [imageIndex, setImageIndex] = useState(0);
  const images = [One, Two, Three, Four, Five, Six];

  const handleNext = () => {
    if (imageIndex <= images.length) {
      setImageIndex(imageIndex + 1);
    }
  };

  const handleClose = () => {
    setCookie("tutorial", "true", { path: "/" });
    setIsVisible(false);
  };

  const { windowSize } = useWindowSizeCustom();

  useEffect(() => {
    if (cookies.tutorial === true || !accessToken) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [cookies, accessToken]); // Dependencies array ensures effect runs when either value changes.

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 text-[19px] ${
        imageIndex === 0 ? "bg-black bg-opacity-50" : ""
      } flex justify-center items-center z-50`}
    >
      {imageIndex === 0 ? (
        <div className="w-[331px] h-[557px] bg-[#2E2E2E] rounded-[32px] shadow-md flex flex-col justify-between text-white p-4 relative">
          <h2 className="text-2xl font-bold my-4 mx-5 ">
            {username}님, <br />
            반가워요
          </h2>
          <img
            src={TutorialCharacter}
            alt="튜토리얼 캐릭터"
            className="w-[150px] h-[150px] mx-auto"
          />
          <p className=" mx-5">
            본격적으로 시작하기 전에, <br />
            My List 사용 메뉴얼을 <br />
            빠르게 살펴볼까요?
          </p>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleNext}
              className="w-[100px] h-[40px] text-[22px] text-center bg-white font-bold text-black rounded-full"
            >
              GO !
            </button>
          </div>
        </div>
      ) : imageIndex <= images.length ? (
        <div className="w-full h-screen flex justify-center items-center">
          <div className="relative h-screen">
            <img
              src={images[imageIndex - 1]}
              alt={`Step ${imageIndex}`}
              className={`w-screen h-[${windowSize.height}] object-cover`}
            />
            {/* 건너뛰기 버튼 */}
            <div className="absolute bottom-2 left-4 smartPhone12:bottom-8 smartPhoneXs:bottom-4 smartPhone:bottom-32">
              <button
                onClick={handleClose}
                className="flex items-center justify-center flex-row  w-[120px] h-[40px] bg-black text-white border-2 border-white font-bold text-[14px] rounded-full px-4 smartPhoneXs:w-[100px] smartPhone12:w-[115px] smartPhone:w-[120px]"
              >
                <span className="mr-2  smartPhone:text-[12px] smartPhone12:text-[13px] smartPhoneXs:text-[8px]">
                  건너뛰기
                </span>
                <FaChevronRight color="white" size={26} />
              </button>
            </div>
            {/* 다음으로 넘기기 버튼 */}
            <div className="absolute bottom-2 right-4 smartPhone12:bottom-8 smartPhoneXs:bottom-4 smartPhone:bottom-32">
              <button
                onClick={handleNext}
                className="flex items-center justify-center flex-row  w-[200px] h-[40px] bg-white font-bold text-[14px] text-black rounded-full px-4 smartPhoneXs:w-[150px] smartPhone12:w-[190px] smartPhone:w-[200px]"
              >
                <span className="mr-2  smartPhone:text-[12px] smartPhone12:text-[13px] smartPhoneXs:text-[8px]">
                  탭해서 다음으로 넘기기
                </span>
                <FaChevronRight color="black" size={26} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-[331px] h-[289px] bg-[#2E2E2E] rounded-[32px] shadow-md flex flex-col justify-between text-white p-4 relative">
          <h2 className="text-xl font-bold m-3">
            이제, <br />
            My List를 <br />
            제대로 만나볼까요?
          </h2>
          <div className="flex justify-between items-end flex-1">
            <p className="text-base m-3">
              튜토리얼은 끝! <br />
              지금부터는 <br />
              내 취향이 잔뜩 담긴 <br />
              플레이리스트를 만들러가요!
            </p>
            <button
              onClick={handleClose}
              className="w-[50px] h-[50px] bg-white text-black rounded-full flex justify-center items-center p-3 mb-2"
            >
              <FaChevronRight color="black" size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tutorial;
