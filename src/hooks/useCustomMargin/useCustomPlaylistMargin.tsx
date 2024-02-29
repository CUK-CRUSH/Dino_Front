import { useState, useEffect } from 'react';
import useWindowSizeCustom from "@hooks/useCustomMargin/useWindowSizeCustom"

export const useCustomPlaylistMargin = () => {
  const [customPlaylistMargin, setCustomPlaylistMargin] = useState<number>(0);
  const { windowSize, isMobile } = useWindowSizeCustom();

  useEffect(() => {
    if (!isMobile) {
      setCustomPlaylistMargin((390 / 2 - 150) / 2);
    } else {
      if (windowSize.width > 400 && windowSize.width <= 429) {
        setCustomPlaylistMargin((windowSize.width / 2 - 150) / 2);
      } else if (windowSize.width >= 430) {
        setCustomPlaylistMargin((390 / 2 - 150) / 2);
      } else if (windowSize.width >= 390 && windowSize.width <= 400) {
        setCustomPlaylistMargin((390 / 2 - 150) / 2);
      }
      else if (windowSize.width < 390) {
        setCustomPlaylistMargin((windowSize.width / 2 - 150) / 2);
      }
    }
  }, [windowSize.width, isMobile]);

  return customPlaylistMargin;
};