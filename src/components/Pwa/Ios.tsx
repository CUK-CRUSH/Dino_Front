import useWindowSizeCustom from "@hooks/useCustomMargin/useWindowSizeCustom";
import { useEffect, useState } from "react";
import TutorialCharacter from "@assets/Install/TutorialCharacter.svg";
import { useCookies } from "react-cookie";


const Ios = () => {

  const isDeviceIOS = /iPad|iPhone|iPod/.test(window.navigator.userAgent);

  const [cookies,setCookie] = useCookies(['iosOneDayInstallation']);

  // myVar 상태와 이 상태를 설정할 수 있는 함수 setMyVar를 선언합니다.
  // 초기값은 false로 설정합니다.
  const [myVar, setMyVar] = useState(false);

  useEffect(() => {
    // 타이머를 설정합니다. 3000밀리초(3초)가 지난 후에 실행됩니다.
    const timer = setTimeout(() => {
      // 3초 후에 myVar의 값을 true로 변경합니다.
      setMyVar(true);
    }, 3000);

    // 컴포넌트가 언마운트될 때 타이머를 정리합니다.
    // 이는 메모리 누수를 방지하는 데 도움이 됩니다.
    return () => clearTimeout(timer);
  }, []);

  const [isIosSessionInstallation, setIsIosSessionInstallation] = useState<any>(sessionStorage.getItem('iosSessionInstallation'));

  const close = () =>{
    sessionStorage.setItem('iosSessionInstallation','true')
    setIsIosSessionInstallation(true);
  }

  const [isIosOneDayInstallation, setIsIosOneDayInstallation] = useState<string | undefined>(cookies.iosOneDayInstallation);


  // 오늘하루 보지 않기 기능
  const closeOneDay = () => {
    setCookie('iosOneDayInstallation', 'true', { path: '/', maxAge: 86400 }); // maxAge는 초 단위입니다 하루.
    setIsIosOneDayInstallation('true'); // 세션 스토리지 변경 후, isiosInstallation 상태를 업데이트하여 컴포넌트를 재렌더링합니다.
  }

  const [isIosEternalInstallation, setIsIosEternalInstallation] = useState<any>(localStorage.getItem('iosEternalInstallation'));

  const closeEternal = () =>{
    localStorage.setItem('isIosEternalInstallation','true')
    setIsIosEternalInstallation(true);
  }

  return (

    <>
      {/* 설치가 안되있고 오늘하루보지않기 안 누른사람 접속한지 3초가 된사람 핸드폰일때*/}

      { myVar && isDeviceIOS && (!isIosOneDayInstallation || !isIosSessionInstallation || !isIosEternalInstallation) && (
        <div className="fixed top-0 right-0 bottom-0 left-0 bg-black bg-opacity-60 z-40">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-[331px] h-[300px] bg-[#2E2E2E] rounded-[32px] shadow-md flex flex-col justify-start text-white p-[10%]">
              <div className="flex justify-center mb-[10px] text-[19px] font-PretendardSemiBold">
                <p>MyList를 앱으로 만나보세요! <br /> <span>아래버튼을 누르면 다운됩니다.</span></p>
              </div>
              <div className="flex justify-end my-[15px]">
                <img
                  src={TutorialCharacter}
                  alt="튜토리얼 캐릭터"
                  className="w-[60px] h-[80px] flex justify-end"
                />
              </div>
              <div className="flex justify-between my-[15px]">
                <button
                  onClick={closeOneDay}
                  className="w-[100px] h-[40px] text-[16px] text-center bg-white font-PretendardSemiBold text-black rounded-full"
                >
                  하루동안 안보기
                </button>
                <button
                  onClick={closeEternal}
                  className="w-[150px] h-[40px] text-[16px] text-center bg-[#2E2E2E] font-PretendardSemiBold text-white border-[2px] rounded-full"
                >
                  오늘 하루 보지 않기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Ios;