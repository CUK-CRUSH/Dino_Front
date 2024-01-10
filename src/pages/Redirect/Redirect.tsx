import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const backendUrl = "https://crush-mylist.kro.kr:8080";

const Redirect = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // 현재 url에서 code 부분 추출
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    // Get the state from the URL
    const state = params.get("state");
    const scope = params.get("scope");
    const authuser = params.get("authuser");
    const prompt = params.get("prompt");

    useEffect(() => {
        if (code) {
            const handleLoginPost = async (code: any, state: any) => {
                const handleNickName = () => {
                    console.log('Navigating to validation');
                    navigate("/login/validation");
                    window.location.reload();
                };

                const value = {
                    code: code,
                    state: state,
                    scope: scope,
                    authuser: authuser,
                    prompt: prompt
                };

                try {
                    await axios.get(`${backendUrl}/login/oauth2/code/google`, { params: value })
                        .then(response => {
                            if (response.data) {
                                console.log('Response status:', response.status);
                                const accessToken = response.data.access_token;
                                const refreshToken = response.data.refresh_token;
                                console.log('Access Token:', accessToken);
                                console.log('Refresh Token:', refreshToken);
                                localStorage.setItem("accessToken", accessToken);
                                localStorage.setItem("refreshToken", refreshToken);
                                console.log("로그인 성공");

                                handleNickName();

                            } else {
                                console.log("No response data received from the API");
                            }
                        })
                        .catch(error => {
                            console.log('Error:', error.message);
                            if (error.response) {
                                console.log(error.response.data);
                                console.log(error.response.status);
                                console.log(error.response.headers);
                            } else if (error.request) {
                                console.log(error.request);
                            } else {
                                console.log('Error', error.message);
                            }
                            console.log(error.config);
                        });
                } catch (error) {
                    console.error(error);
                }
            };

            handleLoginPost(code, state);
        } else {
            console.log("로그인 재시도하세요.");
        }
    }, [code, state, navigate, authuser, prompt, scope]);

    // Listen for changes in the route
    useEffect(() => {
        console.log("Route changed to: ", location.pathname);
    }, [location]);

    return (
        <h2 className={"text-white"}>로그인중입니다....</h2>
    );
};

export default Redirect;