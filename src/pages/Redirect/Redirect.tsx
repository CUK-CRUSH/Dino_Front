import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const fetchData = async (setCookie:any) => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("access_token"); // This will be stored in cookies
    const refreshToken = params.get("refresh_token"); // This will be stored in local storage

    if (accessToken && refreshToken) {
        setCookie("accessToken", accessToken, { path: "/" }); // Set accessToken in cookies
        localStorage.setItem("refreshToken", refreshToken); // Set refreshToken in local storage

        // Log the stored tokens
        return true; // tokens are successfully set
    }
    return false; // tokens are not set
};

const Redirect = () => {
    const navigate = useNavigate();
    const [, setCookie] = useCookies(["accessToken"]); // Initialize cookie

    useEffect(() => {
        const redirectAfterFetch = async () => {
            const success = await fetchData(setCookie); // Pass setCookie function to fetchData
            if (success) {
                navigate("/validtaion"); // Then navigate
            } else {
                navigate("/"); // If tokens are not set, navigate to main
            }
        };

        redirectAfterFetch();
    }, [navigate, setCookie]); // Add setCookie to the dependency array

    return (
        <h2 className={"text-white"}>로그인중입니다....</h2>
    );
};

export default Redirect;