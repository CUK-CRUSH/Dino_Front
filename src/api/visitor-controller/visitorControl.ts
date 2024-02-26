import { axiosInstance } from "@api/axiosInstance";

// 플레이리스트 방명록 조회하기
export const getVisitor = async (playlistId: number, page: any = "0") => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/playlist/${playlistId}/guestbook?page=${page}`
    );
    if (response) {
      return response.data;
    } else {
      return;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 유저 플레이리스트 생성하기
export const postVisitor = async (
  playlistId: number,
  content: string,
  cookies?: string
) => {
  try {
    const response = await axiosInstance.post(
      `/api/v1/playlist/${playlistId}/guestbook`,
      { content },

      {
        headers: {
          Authorization: `Bearer ${cookies}`,
        },
      }
    );

    if (response) {
      return response.data;
    } else {
      return;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteVisitor = async (
  playlistId: number,
  guestbookId: number,
  cookies?: string
) => {
  try {
    const response = await axiosInstance.delete(
      `/api/v1/playlist/${playlistId}/guestbook/${guestbookId}`,
      {
        headers: {
          Authorization: `Bearer ${cookies}`,
        },
      }
    );
    if (response) {
      return response.data;
    } else {
      return;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 유저 플레이리스트 변경하기
export const patchVisitor = async (
  playlistId: number,
  guestbookId: number,
  content: string,
  cookies?: string
) => {
  try {
    const response = await axiosInstance.patch(
      `/api/v1/playlist/${playlistId}/guestbook/${guestbookId}`,
      { content },
      {
        headers: {
          Authorization: `Bearer ${cookies}`,
        },
      }
    );

    if (response) {
      return response.data;
    } else {
      return;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
