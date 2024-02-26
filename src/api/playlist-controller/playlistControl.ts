import { axiosInstance } from "@api/axiosInstance";

// 유저의 플레이리스트 전체 조회하기
export const getPlayList = async (username: string | undefined) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/playlist/user/${username}`
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
export const postPlayList = async (
  playlistName?: string | null,
  titleImage?: string | null,
  cookies?: string
) => {
  try {
    let formData = new FormData();
    if (playlistName) {
      formData.append("playlistName", playlistName);
    }

    if (titleImage) {
      const binaryData = Uint8Array.from(atob(titleImage.split(",")[1]), (c) =>
        c.charCodeAt(0)
      );

      formData.append(
        "titleImage",
        new Blob([binaryData], { type: "image/png" }),
        "image.png"
      );
    }

    const response = await axiosInstance.post(`/api/v1/playlist`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${cookies}`,
      },
    });

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

// 유저의 플레이리스트  단일 조회하기
export const getSinglePlayList = async (
  playlistId: number,
  cookies?: string
) => {
  try {
    const response = cookies
      ? await axiosInstance.get(`/api/v1/playlist/${playlistId}`, {
          headers: {
            Authorization: `Bearer ${cookies}`,
          },
        })
      : await axiosInstance.get(`/api/v1/playlist/${playlistId}`);
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

// 유저 플레이리스트 삭제하기
export const deletePlayList = async (playlistId: string, cookies?: string) => {
  try {
    const response = await axiosInstance.delete(
      `/api/v1/playlist/${playlistId}`,
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
export const putPlayList = async (
  playlistId: string,
  playlistName: string | null,
  titleImage?: any,
  cookies?: string
) => {
  try {
    let formData = new FormData();
    if (playlistName) {
      formData.append("playlistName", playlistName);
    }

    if (titleImage) {
      const binaryData = Uint8Array.from(atob(titleImage.split(",")[1]), (c) =>
        c.charCodeAt(0)
      );
      const type = titleImage.split(",")[0].split(":")[1].split(";")[0];
      formData.append(
        "titleImage",
        new Blob([binaryData], { type }),
        "image." + type.split("/")[1]
      );
    }
    const response = await axiosInstance.patch(
      `/api/v1/playlist/${playlistId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
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

// 유저 플레이리스트 이미지 삭제하기
export const deletePlayListImage = async (
  playlistId: string,
  cookies?: string
) => {
  try {
    const response = await axiosInstance.delete(
      `/api/v1/playlist/${playlistId}/image`,
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

// 좋아요 추가하기
export const postLike = async (playlistId: number, cookies?: string) => {
  try {
    const response = await axiosInstance.post(
      `/api/v1/playlist/${playlistId}/like`,
      null,
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

export const deleteLike = async (playlistId: number, cookies?: string) => {
  try {
    const response = await axiosInstance.delete(
      `/api/v1/playlist/${playlistId}/like`,
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

export const getLikeList = async (playlistId: number, page: any = "0") => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/playlist/${playlistId}/like?page=${page}`
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

// 좋아요한 플레이리스트 조회
export const getFavoritesPlayList = async (
  username?: string,
  cookies?: string,
  page: any = "0",
  setIsLoading?: (loading: boolean) => void
) => {
  try {
    setIsLoading?.(true); // 로딩 시작
    const response = await axiosInstance.get(
      `/api/v1/member/playlist/like?username=${username}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${cookies}`,
        },
      }
    );
    setIsLoading?.(false); // 로딩 완료
    if (response) {
      return response.data;
    } else {
      return;
    }
  } catch (error) {
    console.log(error);
    setIsLoading?.(false); // 에러 발생시 로딩 완료
    throw error;
  }
};
