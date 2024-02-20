import { axiosInstance } from "@api/axiosInstance";

// 플레이리스트 초기 조회하기
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

// 플레이리스트 초기 조회하기
export const getSearchPlaylist = async (query : string | null , page : any = '0') => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/search/playlist?q=${query}&page=${page}`
    );
    if (response) { return response.data; }
    else { return }
  } catch (error) {
    console.log(error);
    throw error;
  }
};