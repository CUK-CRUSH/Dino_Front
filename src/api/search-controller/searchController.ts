import { axiosInstance } from "@api/axiosInstance";

// 유저의 플레이리스트 전체 조회하기
export const getSearch = async (query : string | null) => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/search?q=${query}`
      );
      if (response) { return response.data; }
      else { return }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };