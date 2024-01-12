import { axiosInstance } from "@api/axiosInstance";

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
  url: string,
  cookies?: string
) => {
  if (!playlistId || !title || !artist || !url) {
    throw new Error("모든 항목을 입력해주세요.");
  }
  try {
    const response = await axiosInstance.post(
      `/api/v1/playlist/${playlistId}/music/add`,
      {
        title,
        artist,
        url,
      },
      {
        headers: {
          Authorization: `Bearer ${cookies}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteMusicList = async (
  playlistId: string,
  musicId: string,
  cookies?: string
) => {
  try {
    const response = await axiosInstance.delete(
      `/api/v1/playlist/${playlistId}/music/${musicId}`,
      {
        headers: {
          Authorization: `Bearer ${cookies}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
