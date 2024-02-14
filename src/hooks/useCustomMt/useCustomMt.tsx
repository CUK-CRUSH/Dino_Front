import { useEffect, useState } from 'react';

export default function useCustomMt(length: number | undefined, authority: boolean) {
  const [marginTopClass, setMarginTopClass] = useState<string | undefined>();

  console.log(length,authority)
  useEffect(() => {
    let marginTopClassValue;

    if (authority) {
      const marginTop = length;
      if(marginTop === 0 ){
        marginTopClassValue = '-mt-[100px]';
      } else if (marginTop && marginTop >= 1 && marginTop < 2) {
        marginTopClassValue = '-mt-[95px]';
      } 
      else if (marginTop && marginTop >= 2 && marginTop <= 3) {
        marginTopClassValue = '-mt-[40px]';
      } else {
        marginTopClassValue = '-mt-[40px]';
      }
    } else {
      const marginTop = length;
      console.log(marginTop)

      if (marginTop === 0) {
        marginTopClassValue = '-mt-[100px]';
      } else if (marginTop && marginTop >= 1 && marginTop <= 2) {
        marginTopClassValue = '-mt-[95px]';
      } else {
        marginTopClassValue = '-mt-[40px]';
      }
    }

    setMarginTopClass(marginTopClassValue);
  }, [length, authority]);

  return marginTopClass;
}