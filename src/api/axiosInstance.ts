import axios from "axios";
import Cookies from "js-cookie";

export const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER}`,
});

// axios 요청 전에 실행되는 interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    // 요청 전에 accessToken이 유효한지 확인
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      // accessToken이 유효하면 Authorization 헤더에 추가
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axios 응답 후에 실행되는 interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 응답이 401 Unauthorized인 경우 refreshToken으로 accessToken 재발급
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axiosInstance.post("/login/token/reissue", {
          refreshToken,
        });
        // 새로운 accessToken으로 localStorage 업데이트
        Cookies.set("accessToken", response.data.data.access_token);
        console.log("토큰을 새로 발급 중입니다...");

        // 재발급된 accessToken으로 원래 요청 다시 보내기
        originalRequest.headers.Authorization = `Bearer ${response.data.data.access_token}`;
        return axiosInstance(originalRequest);
      } catch (error) {
        // refreshToken으로 재발급 실패 시 로그인 페이지로 이동 또는 오류 처리
        console.log(error);
        // 예: 로그인 페이지로 이동
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
