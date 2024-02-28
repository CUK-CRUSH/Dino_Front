
import useWindowSizeCustom from "@hooks/useCustomMargin/useWindowSizeCustom";
import { useEffect, useState } from "react";

function useCompareToken() {
  const { windowSize } = useWindowSizeCustom();

  // 사이즈 390 보다 크면 모달창 크기 고정
  const [size, setSize] = useState<string>();

  useEffect(() => {
    if (windowSize.width === 390) {
      setSize("w-[390px]")
      return;
    }

    if (windowSize.width === 414) {
      setSize("w-[414px]")
      return;
    }

    if ((windowSize.width < 390) || ((windowSize.width < 429) && (windowSize.width > 391))) {
      setSize("w-full")
      return;
    }

    if (windowSize.width >= 430) {
      setSize('w-[390px]')
    }

  }, [windowSize.width]);

  return size;
}

export default useCompareToken;