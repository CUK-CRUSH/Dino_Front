import { axiosInstance } from "@api/axiosInstance";

// 특정 회원 정보 조회
export const getMember = async (id : string) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/member/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 회원 닉네임 중복 검사
export const getNicknameAvailable = async (username : string) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/member/nickname/available/${username}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 내 정보 조회
export const getMemberMe = async () => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/member/me`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// export const postMusicList = async (
//   playlistId: string,
//   title: string,
//   artist: string,
//   url: string,
//   cookies?: string
// ) => {
//   if (!playlistId || !title || !artist || !url) {
//     throw new Error("모든 항목을 입력해주세요.");
//   }
//   try {
//     const response = await axiosInstance.post(
//       `/api/v1/playlist/${playlistId}/music/add`,
//       {
//         title,
//         artist,
//         url,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${cookies}`,
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

// export const deleteMusicList = async (
//   playlistId: string,
//   musicId: string,
//   cookies?: string
// ) => {
//   try {
//     const response = await axiosInstance.delete(
//       `/api/v1/playlist/${playlistId}/music/${musicId}`,
//       {
//         headers: {
//           Authorization: `Bearer ${cookies}`,
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };
