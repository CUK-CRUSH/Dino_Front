import useWindowSizeCustom from "@hooks/useCustomMargin/useWindowSizeCustom";
import { useEffect, useState } from "react";
import TutorialCharacter from "@assets/Install/TutorialCharacter.svg";
import { useCookies } from "react-cookie";
import closeButton from "@assets/Etc/close.svg";

const Android = () => {

  const [cookies,setCookie] = useCookies(['androidInstallation','isAndroidSessionInstallation','accessToken']);
  
  // pwa 설치
  // BeforeInstallPromptEvent 타입 정의 (이 타입은 MDN 문서 또는 해당 API의 타입스크립트 정의에서 찾을 수 있습니다.)
  interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed', platform: string }>;
  }
  
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      // 설치 유도 이벤트를 방지하고, 나중에 사용할 수 있도록 저장
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
    };
  }, []);

  const handleInstallClick = () => {
    if (!installPrompt) {
      return;
    }

    // 설치 프롬프트를 보여줌
    installPrompt.prompt();

    // 사용자의 응답을 기다림
    installPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('사용자가 PWA 설치를 수락했습니다.');
      } else {
        console.log('사용자가 PWA 설치를 거부했습니다.');
      }
      setInstallPrompt(null);
    });
  };
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
  }, []); // 빈 배열을 의존성 배열로 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 합니다.
  const [isInstalled, setIsInstalled] = useState<string | undefined>(cookies.androidInstallation);
  const [isAndroidSessionInstallation, setIsAndroidSessionInstallation] = useState<string | undefined>(cookies.isAndroidSessionInstallation);

  const close = () =>{
    setCookie('isAndroidSessionInstallation', 'true'); // maxAge는 초 단위입니다 하루.
    setIsAndroidSessionInstallation('true');
  }

  // 오늘하루 보지 않기 기능
  const handleClose = () => {
    setCookie('androidInstallation', 'true', { path: '/', maxAge: 86400 }); // maxAge는 초 단위입니다 하루.
    setIsInstalled('true'); // 세션 스토리지 변경 후, isInstalled 상태를 업데이트하여 컴포넌트를 재렌더링합니다.
  }

  // 핸드폰
  const { isMobile } = useWindowSizeCustom();

  return (

    <>
    {/* 설치가 안되있고 오늘하루보지않기 안 누른사람 접속한지 3초가 된사람 핸드폰일때*/}

      {(!cookies.accessToken || (cookies.accessToken && localStorage.getItem('tutorial'))) && installPrompt && (!isInstalled && !isAndroidSessionInstallation) && myVar && isMobile && (
        <div className="fixed top-0 right-0 bottom-0 left-0 bg-black bg-opacity-60 z-40">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-[350px] h-[330px] bg-[#2E2E2E] rounded-[32px] shadow-md flex flex-col justify-start text-white px-[5%]">
              <div 
                className="flex justify-end mt-[15px] text-[#fff] pointer-cursor"
                onClick={close}
                >
                 <img src={closeButton} alt='x' />
              </div>
              <div className="flex justify-center my-[15px] text-[19px] font-PretendardSemiBold">
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
                  onClick={handleInstallClick}
                  className="w-[100px] h-[40px] text-[16px] text-center bg-white font-PretendardSemiBold text-black rounded-full"
                >
                  다운받기
                </button>
                <button
                  onClick={handleClose}
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

export default Android;