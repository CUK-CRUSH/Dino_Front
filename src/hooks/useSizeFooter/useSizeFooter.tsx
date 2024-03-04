import { useState, useEffect } from "react";

const useSizeFooter = (length: number | undefined, size: number, authority?: boolean,) => {
  const [height, setHeight] = useState<number>(70);

  useEffect(() => {
    const adjustedLength = authority && length !== undefined && length % 2 === 0 ? length + 1 : length;
    const quotient = adjustedLength !== undefined && adjustedLength >= 0 && adjustedLength <= 2 ? 0 : Math.ceil((adjustedLength || 0) / 2) - 1;

    setHeight(size * quotient);
  }, [length, authority,size])
  return { height: `${height}px` };
}

export default useSizeFooter;