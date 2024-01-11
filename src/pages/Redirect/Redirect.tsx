import React from "react";
import { useNavigate } from "react-router-dom";


const Redirect = () => {
    const navigate = useNavigate();

    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("access_token"); //얘는 쿠키에
    const refreshToken = params.get("refresh_token");
    console.log(accessToken);
    console.log(refreshToken);
    if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken!);
        navigate("/admin");
    } else {
        navigate("/login/validation");
    }
    //나중에 엑세스 토큰이 만료되면 리프레시 토큰 다시 재발급


    return (
        <h2 className={"text-white"}>로그인중입니다....</h2>
    );
};

export default Redirect;
