import { axiosInstance } from "@api/axiosInstance";

// 음악 조회하기
export const getMusicList = async (playlistId: number, page?: number) => {
  try {
    let url = `/api/v1/music/${playlistId}`;
    if (page !== undefined) {
      url += `?page=${page}`;
    }
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 음악 추가하기
export const postMusicList = async (
  playlistId: number,
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
      `/api/v1/music/${playlistId}`,
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

// 음악 삭제하기
export const deleteMusicList = async (musicId: number, cookies?: string) => {
  try {
    const response = await axiosInstance.delete(
      `/api/v1/music?musicId=${musicId}`,
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

// 음악 변경하기
export const patchMusicList = async (
  musicId: number,
  title: string,
  artist: string,
  url: string,
  cookies?: string
) => {
  if (!musicId || !title || !artist || !url) {
    throw new Error("모든 항목을 입력해주세요.");
  }
  try {
    const response = await axiosInstance.patch(
      `/api/v1/music?musicId=${musicId}`,
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
