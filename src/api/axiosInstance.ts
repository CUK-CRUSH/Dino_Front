import axios from "axios";
import { postRefreshToken } from "./refresh-controller/refreshController";
import Cookies from 'js-cookie';


export const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER}`,
});

axiosInstance.interceptors.response.use(
  
  async (response) => {
    console.log(response)
    return response;
  },
  async (error) => {
    const { config, response: { status } } = error;
    const originalRequest = config;
    console.log('Request Body:', originalRequest.data);

    if (error.response.status === 401) {
      try {
        const tokenResponse = await postRefreshToken();
        console.log(tokenResponse)
        if (tokenResponse.status === 200) {
          const { accessToken } = tokenResponse.data;
          Cookies.set('accessToken', accessToken);
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (err) {
        console.error(err);
        // 필요한 경우 로그인 페이지로 리다이렉트 등의 추가 처리를 할 수 있습니다.
      }
    }

    return Promise.reject(error);
  }
);