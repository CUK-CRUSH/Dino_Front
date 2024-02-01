import React, { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import useDecodedJWT from "@hooks/useDecodedJWT";
import {  getMember } from "@api/member-controller/memberController";
import { useDispatch } from "react-redux";
import { setToast } from "@reducer/Toast/toast";

const fetchData = async (setCookie : any) => {
  const params = new URLSearchParams(window.location.search);
  const accessToken = params.get("access_token");
  const refreshToken = params.get("refresh_token");

    if (accessToken && refreshToken) {
        setCookie("accessToken", accessToken, { path: "/" }); // Set accessToken in cookies
        localStorage.setItem("refreshToken", refreshToken); // Set refreshToken in local storage
        return true; // tokens are successfully set
    }
    return false; // tokens are not set
};

const Redirect = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["accessToken"]);

  const decodedToken = useDecodedJWT(cookies.accessToken);
  const dispatch = useDispatch();

  useEffect(() => {
    const redirectAfterFetch = async () => {
      const success = await fetchData(setCookie);
  
      if (decodedToken) {
        // If decodedToken is present, fetch user data after a 1-second delay
       
          try {
            const getUserData = await getMember(decodedToken.sub);
            console.log(getUserData);
  
            if (success && !getUserData.data.username) {
              // Handle the case where username is not present
              dispatch(setToast('login'));
              navigate("/login/validation");
            } else {
              // Handle the case where username is present
              dispatch(setToast('login'));
              navigate(`/${getUserData.data.username}`);
            }
          } catch (error) {
            console.error('Error fetching member:', error);
          }
      } else {
        // Handle the case where decodedToken is not present
        console.error('Decoded token is not present');
        // You may want to add additional handling for this case if necessary
      }
    };
  
    redirectAfterFetch();
  }, [navigate, setCookie, decodedToken, dispatch]);

  return (
    <h2 className={"text-white"}>로그인중입니다....</h2>
  );
};

export default Redirect;