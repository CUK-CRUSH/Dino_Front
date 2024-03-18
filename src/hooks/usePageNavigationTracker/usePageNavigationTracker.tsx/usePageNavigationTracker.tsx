import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// 페이지 이동을 추적하는 훅
function usePageNavigationTracker() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // navigationCount가 sessionStorage에 존재하지 않는다면, 현재 페이지를 첫 페이지로 간주하고 0으로 초기화합니다.
    if (!sessionStorage.getItem('navigationCount')) {
      sessionStorage.setItem('navigationCount', '0');
    } else {
      // 현재 페이지가 첫 페이지가 아니라면 navigationCount를 증가시킵니다.
      const navigationCount = parseInt(sessionStorage.getItem('navigationCount') || '0', 10);
      sessionStorage.setItem('navigationCount', (navigationCount + 1).toString());

    }
  }, [location, navigate]);
}

export default usePageNavigationTracker