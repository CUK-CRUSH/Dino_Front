import { axiosInstance } from "@api/axiosInstance";

// 추천 플레이리스트 조회
export const getRecommendation = async () => {
  try {
    const response = await axiosInstance.get(`/api/v1/recommendation`);
    if (response) { return response.data; }
    else { return }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
