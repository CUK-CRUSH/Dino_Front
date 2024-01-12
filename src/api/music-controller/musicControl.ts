import { axiosInstance, axiosInstanceWithToken } from "@api/axiosInstance";

export const getMusicList = async (playlistId: string) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/playlist/${playlistId}/music`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const postMusicList = async (
  playlistId: string,
  title: string,
  artist: string,
  url: string
) => {
  if (!playlistId || !title || !artist || !url) {
    throw new Error("모든 항목을 입력해주세요.");
  }
  try {
    const response = await axiosInstanceWithToken.post(
      `/api/v1/playlist/${playlistId}/music/add`,
      {
        title,
        artist,
        url,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteMusicList = async (playlistId: string, musicId: string) => {
  try {
    const response = await axiosInstanceWithToken.delete(
      `/api/v1/playlist/${playlistId}/music/${musicId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
