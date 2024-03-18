import React, { useEffect, useState } from "react";
import TutorialCharacter from "@assets/Tutorial/Character.svg";
import { useCookies } from "react-cookie";
import { TutorialStep } from "@atoms/Tutorial/TutorialStep";
import { useTutorial } from "@hooks/useTutorial/useTutorial";

interface TutorialProps {
  username?: string;
  length?: number;
}
const Tutorial: React.FC<
  TutorialProps & { setTutorialMode: (step: TutorialStep) => void }
> = ({ username, setTutorialMode, length }) => {
  // 컴포넌트 내용...
  const [isVisible, setIsVisible] = useState(true);
  const [token] = useCookies(["accessToken"]);
  const accessToken = token.accessToken;
  const { tutorialStep } = useTutorial();

  // 튜토리얼 닫기 함수
  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
    setTutorialMode("header");
  };

  // 건너뛰기 함수
  const handleSkip = (e: React.MouseEvent) => {
    // localStorage에 튜토리얼을 본 것으로 표시
    e.stopPropagation();
    localStorage.setItem("tutorial", "true");
    setIsVisible(false);
    setTutorialMode(null);
  };

  useEffect(() => {
    const tutorialSeen = localStorage.getItem("tutorial");
    // accessToken이 존재하고, 튜토리얼을 본 적이 없으며, 리스트 길이가 0인 경우에만 모달을 초기에 표시합니다.
    if (!tutorialSeen && accessToken && length === 0 && tutorialStep === null) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [accessToken, length, tutorialStep]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 text-[19px] bg-black bg-opacity-50 flex justify-center items-center z-50`}
      onClick={(e) => e.stopPropagation()}
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
            onClick={handleNext}
            className="w-[100px] h-[50px] text-[19px] text-center bg-white font-bold text-black rounded-full"
          >
            시작하기
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
