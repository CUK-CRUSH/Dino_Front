import useDecodedJWT from "@hooks/useDecodedJWT";
import { useEffect, useState } from "react";

function useCompareToken(id : number | null | undefined) {
  
  const [authority,setAuthority] = useState<boolean>(false);

  // 리프레시 토큰 불러오기
  const refreshToken = localStorage.getItem('refreshToken');

  // 토큰 해독
  const decodedRefeshToken = useDecodedJWT(refreshToken);

  useEffect(()=>{
    if(id && decodedRefeshToken && id === Number(decodedRefeshToken.sub)){
      setAuthority(true);
    }
  },[id,decodedRefeshToken]);
  
  return authority;
}

export default useCompareToken;