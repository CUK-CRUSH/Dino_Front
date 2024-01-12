import axios from "axios";

// GET과 같이 다른 사람도 볼 수 있는 페이지는 토큰 필요없이 가능하다.
export const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER}`,
});

// POST, DELETE, PATCH, PUT 등 유저가 수정, 추가하는 부분은
// 헤더에 토큰 넣어줌.
