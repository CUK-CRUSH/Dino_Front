import { axiosInstance, axiosInstanceWithToken } from "@api/axiosInstance";

// 유저의 플레이리스트 조회하기
export const getPlayList = async (username: string) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/playlist/user/${username}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 유저 플레이리스트 생성하기
export const postPlayList = async (playlistName: string, image?: File) => {
  try {
    let formData = new FormData();
    formData.append("playlistName", playlistName);
    if (image) {
      formData.append("image", image);
    }
    const response = await axiosInstanceWithToken.post(
      `/api/v1/playlist/add`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 유저 플레이리스트 삭제하기
export const deletePlayList = async (playlistId: string) => {
  try {
    const response = await axiosInstanceWithToken.delete(
      `/api/v1/playlist/${playlistId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 유저 플레이리스트 변경하기
export const putPlayList = async (
  playlistId: string,
  playlistName: string,
  image?: File
) => {
  try {
    let formData = new FormData();
    formData.append("playlistName", playlistName);
    if (image) {
      formData.append("image", image);
    }
    const response = await axiosInstanceWithToken.put(
      `/api/v1/playlist/${playlistId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
