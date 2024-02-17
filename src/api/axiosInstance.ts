import axios from "axios";
import Cookies from "js-cookie";

export const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER}`,
});

// axios 요청 전에 실행되는 interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    // 요청 전에 accessToken이 유효한지 확인
    const accessToken = Cookies.get('accessToken');
    if (accessToken && config.url && !config.url.endsWith('/login/token/reissue')) {
      // accessToken이 유효하고, 요청이 토큰 재발급 요청이 아니라면 Authorization 헤더에 추가
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
          console.log('리스레시 토큰이 만료되었습니다.');
          
            window.location.href = '/login';
          
          return Promise.reject(error);
        });
    } else {
      return Promise.reject(error);
    }
  }
);
