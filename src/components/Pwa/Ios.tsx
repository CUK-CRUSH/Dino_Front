import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import closeButton from "@assets/Etc/close.svg";
import iosDownload1 from "@assets/Pwa/iosDownload1.svg";
import iosDownload2 from "@assets/Pwa/iosDownload2.svg";

const Ios = () => {

  const [cookies,setCookie] = useCookies(['isIosSessionInstallation','iosOneDayInstallation','isIosEternalInstallation','accessToken']);

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

  const [isIosSessionInstallation, setIsIosSessionInstallation] = useState<string | undefined>(cookies.isIosSessionInstallation);

  const close = () =>{
    setCookie('isIosSessionInstallation', 'true');
    setIsIosSessionInstallation('true');
  }

  const [isIosOneDayInstallation, setIsIosOneDayInstallation] = useState<string | undefined>(cookies.iosOneDayInstallation);

  // 오늘하루 보지 않기 기능
  const closeOneDay = () => {
    setCookie('iosOneDayInstallation', 'true', { path: '/', maxAge: 86400 }); // maxAge는 초 단위입니다 하루.
    setIsIosOneDayInstallation('true'); 
  }

  const [isIosEternalInstallation, setIsIosEternalInstallation] = useState<string | undefined>(cookies.isIosEternalInstallation);
  const fiftyYearsLater = new Date();
  fiftyYearsLater.setFullYear(fiftyYearsLater.getFullYear() + 50);
  // 영원히 보지 않기
  const closeEternal = () =>{
    setCookie('isIosEternalInstallation', 'true', { path: '/', expires : fiftyYearsLater}); // 10i-년
    setIsIosEternalInstallation('true'); 
  }

  return (

    <>
      {/* 설치가 안되있고 오늘하루보지않기 안 누른사람 접속한지 3초가 된사람 핸드폰일때*/}

      {(!cookies.accessToken || (cookies.accessToken && localStorage.getItem('tutorial'))) && myVar &&   (!isIosOneDayInstallation && !isIosSessionInstallation && !isIosEternalInstallation) && (
        <div className="fixed top-0 right-0 bottom-0 left-0 bg-black bg-opacity-60 z-40">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-[350px] h-[610px] bg-[#2E2E2E] rounded-[32px] shadow-md flex flex-col justify-start text-white px-[8%]">
            <div 
                className="flex justify-end mt-[15px]  text-[#fff] pointer-cursor"
                onClick={close}
                >
                 <img src={closeButton} alt='x' />
              </div>
              <div className="flex justify-center text-[19px] font-PretendardSemiBold">
                <p>MyList를 앱으로 만나보세요! <br /></p>
              </div>
              <div className="flex ">
                <img
                  src={iosDownload1}
                  alt="다운로드 1"
                  className="flex justify-center"
                />
              </div>
              <div className="flex ">
                <img
                  src={iosDownload2}
                  alt="다운로드 2"
                  className="flex justify-center"
                />
              </div>
              <div className="flex justify-between">

                <button
                  onClick={closeEternal}
                  className="w-[100px] h-[40px] text-[16px] text-center bg-white font-PretendardSemiBold text-black rounded-full px-4"
                >
                  그만보기
                </button>
                <button
                  onClick={closeOneDay}
                  className="w-[170px] h-[40px] text-[16px] text-center bg-[#2E2E2E] font-PretendardSemiBold text-white border-[2px] rounded-full px-4"
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