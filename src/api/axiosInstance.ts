import axios from "axios";
import Cookies from 'js-cookie';

export const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER}`,
});

// axios 요청 전에 실행되는 interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    // 요청 전에 accessToken이 유효한지 확인
    const accessToken = localStorage.getItem('accessToken');
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

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refreshToken');
      axiosInstance.post('/login/token/reissue', { refreshToken })
        .then(response => {
          Cookies.set('accessToken', response.data.data.access_token);
          console.log('토큰을 새로 발급 중입니다...');

          originalRequest.headers.Authorization = `Bearer ${response.data.data.access_token}`;
          return axiosInstance(originalRequest);
        })
        .catch(error => {
          console.log('에러가 발생했습니다:', error);
          
            window.location.href = '/login';
          
          return Promise.reject(error);
        });
    } else {
      return Promise.reject(error);
    }
  }
);