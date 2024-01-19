import { axiosInstance } from "@api/axiosInstance";

// 회원 닉네임 변경
export const putUsername = async (
  username: string,
  cookies?: string
) => {
  try {
    const response = await axiosInstance.put(
      `/api/v1/member/nickname/${username}`,
      null,
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

// 특정 회원 정보 조회
export const getMember = async (id: number, cookies?: string) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/member/${id}`,
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

// 회원 닉네임 중복 검사
export const getNicknameAvailable = async (username: string, cookies?: string) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/member/nickname/available/${username}`,
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

// 내 정보 조회
export const getMemberMe = async (cookies?: string) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/member/me`,
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

// 정보수정
export const updateMember = async (
  username: string,
  introduction: string,
  profileImage?: File,
  backgroundImage?: File,
  cookies?: string,
) => {
  try {
    const formData = new FormData();

    formData.append('username', username);
    formData.append('introduction', introduction);

    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    if (backgroundImage) {
      formData.append('backgroundImage', backgroundImage);
    }

    const response = await axiosInstance.patch(
      '/api/v1/member',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${cookies}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error updating member information:', error);
    throw error;
  }
};