import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const backendUrl = "http://34.22.100.187:8080";

const Redirect = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // 이미 가입한 유저일 시 : 메인 페이지로 이동
    const handleHome = () => {
        console.log('Navigating to home');
        navigate("/admin");
        window.location.reload();
    };

    // 처음 가입한 유저일 시 : 닉네임 설정 페이지로 이동
    const handleNickName = () => {
        console.log('Navigating to validation');
        navigate("/login/validation");
        window.location.reload();
    };

    // 현재 url에서 code 부분 추출
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    // Get the state from the URL
    const state = params.get("state");
    const scope = params.get("scope");
    const authuser = params.get("authuser");
    const prompt = params.get("prompt");

    const handleLoginPost = async (code: any, state: any) => {
        const data = {
            code: code,
            state: state,
            scope: scope,
            authuser: authuser,
            prompt: prompt
        };
        try {
            axios.get(`${backendUrl}/login/oauth2/code/google`, {
                params: data
            })
                .then(response => {
                    // handle the response here
                    console.log(response.data);

                    // Save data to local storage
                    localStorage.setItem("authData", JSON.stringify(data));

                    // Check the status code of the response
                    if (response.data.status === "200 OK") {
                        // 로그인 성공
                        // 토큰 localstorage에 저장
                        const accessToken = response.data.data.access_token;
                        const refreshToken = response.data.data.refresh_token;
                        localStorage.setItem("accessToken", accessToken);
                        localStorage.setItem("refreshToken", refreshToken);

                        // 신규/기존 회원 여부에 따라 페이지 이동
                        if (response.data.isExistingMember) {
                            handleHome();
                        } else {
                            console.log("신규 회원입니다.");
                            handleNickName();
                        }
                    } else {
                        // 로그인 실패
                        console.log("로그인 실패");
                    }
                })
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (code) {
            handleLoginPost(code, state);
        } else {
            console.log("로그인 재시도하세요.");
        }
    }, [code, state, navigate]);

    // Listen for changes in the route
    useEffect(() => {
        console.log("Route changed to: ", location.pathname);
    }, [location]);

    return (
        <h2>로그인중입니다....</h2>
    );
};

export default Redirect;