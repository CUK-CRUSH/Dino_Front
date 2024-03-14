import React, { useEffect, useState } from "react";
import TutorialCharacter from "@assets/Tutorial/Character.svg";
import { useCookies } from "react-cookie";

interface TutorialProps {
  username: string;
}

const Tutorial: React.FC<TutorialProps> = ({ username }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [token] = useCookies(["accessToken"]);
  const accessToken = token.accessToken;

  // 튜토리얼 닫기 함수
  const handleClose = () => {
    // localStorage에 튜토리얼을 본 것으로 표시
    localStorage.setItem("tutorial", "true");
    setIsVisible(false);

    // 지정된 URL로 이동
    window.open(
      "https://myist-info.notion.site/MyList-c0677d15f0ef4e979c47acca15258391?pvs=4"
    );
  };

  // 건너뛰기 함수
  const handleSkip = () => {
    // localStorage에 튜토리얼을 본 것으로 표시
    localStorage.setItem("tutorial", "true");
    setIsVisible(false);
  };

  useEffect(() => {
    // 컴포넌트 마운트 시 localStorage에서 튜토리얼 표시 여부 확인
    const tutorialSeen = localStorage.getItem("tutorial");
    if (tutorialSeen === "true" || !accessToken) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [accessToken]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 text-[19px] bg-black bg-opacity-50 flex justify-center items-center z-50`}
    >
      <div className="w-[331px] h-[500px] bg-[#2E2E2E] rounded-[32px] shadow-md flex flex-col  text-white p-4 relative">
        <h2 className="text-2xl font-bold  mx-5 ">
          {username}님, <br />
          반가워요
        </h2>
        <img
          src={TutorialCharacter}
          alt="튜토리얼 캐릭터"
          className="w-[150px] h-[150px] mx-auto mt-8"
        />
        <p className="mt-8 mx-5">
          본격적으로 시작하기 전에, <br />
          My List 사용 메뉴얼을 <br />
          빠르게 살펴볼까요?
        </p>
        <div className="flex justify-between mx-5 mt-8">
          <button
            onClick={handleClose}
            className="w-[100px] h-[50px] text-[19px] text-center bg-white font-bold text-black rounded-full"
          >
            보러가기
          </button>
          <button
            onClick={handleSkip}
            className="w-[100px] h-[50px] text-[19px] text-center bg-black font-bold text-white border-[2.5px] rounded-full"
          >
            건너뛰기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;