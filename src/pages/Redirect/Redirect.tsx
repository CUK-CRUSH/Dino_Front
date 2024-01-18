import React, { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import useDecodedJWT from "@hooks/useDecodedJWT";
import { getMember } from "@api/member-controller/memberController";

const fetchData = async (setCookie : any) => {
  const params = new URLSearchParams(window.location.search);
  const accessToken = params.get("access_token");
  const refreshToken = params.get("refresh_token");

  if (accessToken && refreshToken) {
    setCookie("accessToken", accessToken, { path: "/" });
    localStorage.setItem("refreshToken", refreshToken);
    return true;
  }
  return false;
};

const Redirect = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["accessToken"]);

  const decodedToken = useDecodedJWT(cookies.accessToken);


  useEffect(() => {
    const redirectAfterFetch = async () => {
      const success = await fetchData(setCookie);

      // 특정 유저 정보 조회
      const getUserData = await getMember(decodedToken.sub, cookies.accessToken);
      console.log(getUserData);
      
      if (success && !getUserData.data.username) {
        try {
          
        } catch (error) {
          console.error('Error fetching member:', error);
        }
        
        navigate("/login/validation");
      } else {
        navigate("/");
      }
    };

    redirectAfterFetch();
  }, [navigate, setCookie, decodedToken, cookies.accessToken]);

  return (
    <h2 className={"text-white"}>로그인중입니다....</h2>
  );
};

export default Redirect;