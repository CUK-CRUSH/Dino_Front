import { axiosInstance } from "@api/axiosInstance";

// 리프레시 토큰
export async function postRefreshToken() {
  
    const response = await axiosInstance.post('/login/token/reissue', {
      refreshToken: localStorage.getItem('refreshToken'),
    });
    return response;
  }