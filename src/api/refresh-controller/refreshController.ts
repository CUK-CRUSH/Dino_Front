import { axiosInstance } from "@api/axiosInstance";
import Cookies from 'js-cookie';


// 리프레시 토큰
export async function postRefreshToken() {
  console.log(localStorage.getItem('refreshToken'));
  console.log(Cookies.get('accessToken'))
  const response = await axiosInstance.post('/login/token/reissue', {
    refreshToken: localStorage.getItem('refreshToken'),
  },
   
  );

  console.log(response);
  return response;
}