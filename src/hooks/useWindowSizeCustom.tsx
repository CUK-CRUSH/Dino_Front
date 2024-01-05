import { useEffect, useState } from "react";

interface WindowSizeProps {
  width: number;
  height: number;
}

const useWindowSizeCustom = () => {
  const [isMobile, setMobile] = useState<boolean>(false);

  const [windowSize, setWindowSize] = useState<WindowSizeProps>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
          });
      };

      const userAgent = window.navigator.userAgent;
      const mobile = /iPhone|iPad|iPod|Android/i.test(userAgent);
      setMobile(mobile);

      window.addEventListener("resize", handleResize);

      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    } else {
      return () =>
        window.removeEventListener("resize", () => {
          return null;
        });
    }
  }, [windowSize.width]); // Run when the width of windowSize changes

  return {windowSize, isMobile};
};

export default useWindowSizeCustom;