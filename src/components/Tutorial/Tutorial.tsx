import React, { useEffect, useState } from "react";
import TutorialCharacter from "@assets/Tutorial/Character.svg";
import { useCookies } from "react-cookie";

interface TutorialProps {
  username: string;
}

const Tutorial: React.FC<TutorialProps> = ({ username }) => {
  const [isVisible, setIsVisible] = useState(true);

  const [cookies, setCookie] = useCookies(["tutorial"]);
  const [token] = useCookies(["accessToken"]);
  const accessToken = token.accessToken;

  const handleClose = () => {
    setCookie("tutorial", "true", { path: "/" });
    setIsVisible(false);

    window.open(
      "https://myist-info.notion.site/MyList-c0677d15f0ef4e979c47acca15258391?pvs=4"
    );
  };

  useEffect(() => {
    if (cookies.tutorial === true || !accessToken) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  }, [cookies, accessToken]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 text-[19px] bg-black bg-opacity-50 flex justify-center items-center z-50`}
    >
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
            onClick={handleClose}
            className="w-[100px] h-[40px] text-[22px] text-center bg-white font-bold text-black rounded-full"
          >
            GO !
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
