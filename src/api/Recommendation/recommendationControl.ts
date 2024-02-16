import { axiosInstance } from "@api/axiosInstance";

// 추천 플레이리스트 조회
export const getRecommendation = async () => {
  try {
    const response = await axiosInstance.get(`/api/v1/recommendation`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
