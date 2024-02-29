import { useState, useEffect } from 'react';
import useWindowSizeCustom from "@hooks/useCustomMargin/useWindowSizeCustom"

export const useCustomAdminMargin = () => {
  const [customAdminMargin, setCustomAdminMargin] = useState<number>(0);
  const { windowSize, isMobile } = useWindowSizeCustom();

  useEffect(() => {

    if (windowSize.height < 906) {
      setCustomAdminMargin(-40);
      return;
    }

    else {
      setCustomAdminMargin(-(-20 + windowSize.height - 850));
      return;
    }

  }, [windowSize.height, isMobile]);

  return customAdminMargin;
};