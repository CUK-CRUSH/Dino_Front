import { axiosInstance } from "@api/axiosInstance";

// 플레이리스트 초기 조회하기
export const getSearch = async (query: string | undefined) => {
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

// 플레이리스트 조회하기
export const getSearchPlaylist = async (query: string | null, page: any = '0', setIsLoading?: (loading: boolean) => void
) => {
  try {
    setIsLoading?.(true);  // 로딩 시작
    const response = await axiosInstance.get(
      `/api/v1/search/playlist?q=${query}&page=${page}`
    );
    setIsLoading?.(false);  // 로딩 완료
    if (response) { return response.data; }
    else { return }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 멤버 조회하기
export const getSearchMember = async (query: string | null, page: any = '0') => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/search/member?q=${query}&page=${page}`
    );
    if (response) { return response.data; }
    else { return }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//일간 유저 랭킹 조회
export const getSearchMemberRanking = async () => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/ranking/daily/users`
    );
    if (response) { return response.data; }
    else { return }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//일간 플리 랭킹 조회
export const getSearchPlaylistRanking = async () => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/ranking/daily/playlists`
    );
    if (response) { return response.data; }
    else { return }
  } catch (error) {
    console.log(error);
    throw error;
  }
};