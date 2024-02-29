import { useState, useEffect } from 'react';
import useWindowSizeCustom from "@hooks/useCustomMargin/useWindowSizeCustom"

export const useCustomAdminMargin = () => {
  const [customAdminMargin, setCustomAdminMargin] = useState<number>(0);
  const { windowSize, isMobile } = useWindowSizeCustom();

  useEffect(() => {
    if (!isMobile) {
      setCustomAdminMargin((390 / 2 - 151) / 2);
    } 
    
  }, [windowSize.width, isMobile]);

  return customAdminMargin;
};