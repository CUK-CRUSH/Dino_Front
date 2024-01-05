import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Redirect = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // URL의 쿼리 파라미터에서 인증 코드를 추출합니다.
        const urlParams = new URLSearchParams(location.search);
        const code = urlParams.get('code');

        if (code) {
            // 백엔드 서버의 주소와 엔드포인트를 수정해야 합니다.
            axios.get("http://34.22.100.187:8080/login/oauth2/code/google", { params: { code } })
                .then((response) => {
                    // 응답에서 JWT 토큰을 추출합니다.
                    const jwtToken = response.data.token;

                    // JWT 토큰을 localStorage에 저장합니다.
                    localStorage.setItem("jwtToken", jwtToken);

                    navigate("/admin");
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [navigate, location.search]);

    return (
        <div>
            Redirecting...
        </div>
    );
};

export default Redirect;