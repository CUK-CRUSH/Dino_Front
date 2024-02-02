import axios from "axios";
// import { useCookies } from "react-cookie";

// GET과 같이 다른 사람도 볼 수 있는 페이지는 토큰 필요없이 가능하다.
export const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER}`,
});

// POST, DELETE, PATCH, PUT 등 유저가 수정, 추가하는 부분은
// 헤더에 토큰 넣어줌.

// //refresh token api
// export async function postRefreshToken() {
//   const [,setCookie] = useCookies();

//   const response = await axiosInstance.post('/login/token/reissue', {
//     refreshToken: localStorage.getItem('refreshToken'),
//   });
//   return response;
// }

// axiosInstance.interceptors.response.use(
  
//   // 200번대 응답이 올때 처리
//   (response) => {
//     return response;
//   },
//   // 200번대 응답이 아닐 경우 처리
//   async (error) => {
//     const {
//       config,
//       response: { status },
//     } = error;
    
// 	//토큰이 만료되을 때
//     if (status === 401) {
//       if (error.response.data.message === 'Unauthorized') {
//         const originRequest = config;
//         //리프레시 토큰 api
//         const response = await postRefreshToken();
//         //리프레시 토큰 요청이 성공할 때
//         if (response.status === 200) {
//           const newAccessToken = response.data.token;
//           setCookie('accessToken', response.data.token);
//           localStorage.setItem('refreshToken', response.data.refreshToken);
//           axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
//           //진행중이던 요청 이어서하기
//           originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//           return axios(originRequest);
//         //리프레시 토큰 요청이 실패할때(리프레시 토큰도 만료되었을때 = 재로그인 안내)
//         } else if (response.status === 404) {
//           window.location.replace('/sign-in');
//         } else {
//         }
//       }
//     }
//     return Promise.reject(error);
//   },
// );