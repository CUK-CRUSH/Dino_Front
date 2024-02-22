import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import useDecodedJWT from "@hooks/useDecodedJWT";
import { getMember } from "@api/member-controller/memberController";
import { useDispatch } from "react-redux";
import { setToast } from "@reducer/Toast/toast";

const fetchData = async (setCookie: any) => {
  const params = new URLSearchParams(window.location.search);
  const accessToken = params.get("access_token");
  const refreshToken = params.get("refresh_token");

  if (accessToken && refreshToken) {
    const date = new Date();
    date.setMinutes(date.getMinutes() + 10); // Set the date 10 minutes from now

    setCookie("accessToken", accessToken, { path: "/", expires: date }); // Set accessToken in cookies
    localStorage.setItem("refreshToken", refreshToken); // Set refreshToken in local storage
    return true; // tokens are successfully set
  }
  return false; // tokens are not set
};

const Redirect = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["accessToken"]);

  const decodedToken = useDecodedJWT(cookies.accessToken);
  const id = Number(decodedToken?.sub);

  const dispatch = useDispatch();

  useEffect(() => {
    const redirectAfterFetch = async () => {
      const success = await fetchData(setCookie);

      if (decodedToken) {
        // If decodedToken is present, fetch user data after a 1-second delay

        try {
          if (id !== null) {
            const getUserData = await getMember(id);

            if (success && !getUserData.data.username) {
              dispatch(setToast("login"));
              navigate("/login/validation");
            } else {
              dispatch(setToast("login"));
              navigate(`/user/${getUserData.data.username}`);
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

  return <h2 className={"text-white"}>로그인중입니다....</h2>;
};

export default Redirect;
