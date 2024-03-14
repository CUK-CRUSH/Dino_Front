import { setIsEditing } from "@reducer/editPlayList/isEdit";
import {
  updateArtist,
  updateImage,
  updateTitle,
  updateUrl,
} from "@reducer/musicadd";
import { usePreviousLocation } from "@utils/RouteRedux/isRouting";
import React, { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { LayoutDTO } from "types/layout";

const Layout: React.FC<LayoutDTO> = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const prevLocation = usePreviousLocation();

  const resetEditingState = useCallback(() => {
    dispatch(updateTitle(""));
    dispatch(updateArtist(""));
    dispatch(updateUrl(""));
    dispatch(updateImage(null));
    dispatch(setIsEditing(false));
  }, [dispatch]);

  useEffect(() => {
    const prevPathSplit = prevLocation.pathname.split("/");
    const currPathSplit = location.pathname.split("/");

    if (prevPathSplit.length === 4 && currPathSplit.length === 3) {
      resetEditingState();
    }
    if (Date.now() / 1000 > Number(localStorage.getItem("exp"))) {
      localStorage.removeItem("tokenId");
    }
  }, [location.pathname, prevLocation.pathname, resetEditingState]);

  // pwa 설치
// BeforeInstallPromptEvent 타입 정의 (이 타입은 MDN 문서 또는 해당 API의 타입스크립트 정의에서 찾을 수 있습니다.)
// interface BeforeInstallPromptEvent extends Event {
//   prompt: () => Promise<void>;
//   userChoice: Promise<{ outcome: 'accepted' | 'dismissed', platform: string }>;
// }

// const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);

// const handleClose = () => {
//   sessionStorage.setItem('installation','close');
// }

// useEffect(() => {
//   const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
//     // 설치 유도 이벤트를 방지하고, 나중에 사용할 수 있도록 저장
//     e.preventDefault();
//     setInstallPrompt(e);
//   };

//   window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);

//   return () => {
//     window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
//   };
// }, []);

// const handleInstallClick = () => {
//   if (!installPrompt) return;

//   // 설치 프롬프트를 보여줌
//   installPrompt.prompt();

//   // 사용자의 응답을 기다림
//   installPrompt.userChoice.then((choiceResult) => {
//     if (choiceResult.outcome === 'accepted') {
//       console.log('사용자가 PWA 설치를 수락했습니다.');
//     } else {
//       console.log('사용자가 PWA 설치를 거부했습니다.');
//     }
//     setInstallPrompt(null);
//   });
// };

  return (
    <div className="overflow-hidden  scrollbar-hide bg-[#111111]">
      <div className="min-h-screen h-auto w-full max-h-full flex justify-center">
        <main className="max-w-[390px] smartPhone:max-w-[431px] w-full min-h-screen h-auto overflow-y-auto overflow-x-hidden relative font-PretendardRegular">
          {children}
          {/* {!installPrompt && !sessionStorage.getItem('installation') && (
            <div className={`fixed top-10`}>
              <button className={`text-white  bg-blue-300`} onClick={handleInstallClick}>앱 설치하기</button>
              <button className={`text-white bg-blue-300`} onClick={handleClose}>x</button>
            </div>  
      )} */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
