import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import useDecodedJWT from "@hooks/useDecodedJWT";
import { getMember } from "@api/member-controller/memberController";
import { useDispatch } from "react-redux";
import setItemWithExpiry from "@utils/setItemWithExpiry/setItemWithExpiry";
import { notify } from "@utils/toast/toast";

const fetchData = async (setCookie: any) => {
  const params = new URLSearchParams(window.location.search);
  const accessToken = params.get("access_token");
  const refreshToken = params.get("refresh_token");

  if (accessToken && refreshToken) {
    const date = new Date();
    date.setMinutes(date.getMinutes() + 30); // Set the date 10 minutes from now

    setCookie("accessToken", accessToken, { path: "/", expires: date }); // Set accessToken in cookies
    setItemWithExpiry("refreshToken", refreshToken, 24 * 60 * 60 * 1000);
    // localStorage.setItem('refreshToken',refreshToken)
    return true; // tokens are successfully set
  }
  return false; // tokens are not set
};

const Redirect = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["accessToken"]);

  const decodedToken = useDecodedJWT(cookies.accessToken);
  const id = decodedToken?.sub;

  const dispatch = useDispatch();

  useEffect(() => {
    const redirectAfterFetch = async () => {
      const success = await fetchData(setCookie);

      if (decodedToken) {
        // If decodedToken is present, fetch user data after a 1-second delay

        try {
          if (id !== null) {
            const getUserData = await getMember(id);
            localStorage.setItem("homeUrl", getUserData.data.username); // Set refreshToken in local storage

            if (success && !getUserData.data.username) {
              navigate("/login/validation");
            } else {

              const prevUrl = localStorage.getItem("prevUrl");
              if (prevUrl) {
                window.location.assign(prevUrl);
                localStorage.removeItem("prevUrl");
              } else {
                setTimeout(() => {
                  navigate(`/user/${getUserData.data.username}`);
                  setTimeout(() => {
                    notify('로그인 완료 !','black'); 
                  }, 500);
                }, 1000);
              }
            }
          }
        } catch (error) {
          console.error("Error fetching member:", error);
        }
      } else {
        console.error("Decoded token is not present");
      }
    };

    redirectAfterFetch();
  }, [navigate, setCookie, decodedToken, dispatch, id]);

  return (<h2 className={"text-white"}>로그인중입니다....</h2>);
};

export default Redirect;
