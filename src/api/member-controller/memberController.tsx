import { axiosInstance } from "@api/axiosInstance";
import { UpdateMemberParams } from "types/AdminEdit";

// 회원 닉네임 변경
export const putUsername = async (username: string, cookies?: string) => {
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
export const getMember = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/api/v1/member/id/${id}`, {
      // headers: {
      //   Authorization: `Bearer ${cookies}`,
      // },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 특정 회원 정보 조회
export const getMemberUsername = async (username: string | undefined) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/member/nickname/${username}`,
      {
        // headers: {
        //   Authorization: `Bearer ${cookies}`,
        // },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 회원 닉네임 중복 검사
export const getNicknameAvailable = async (
  username: string,
  cookies?: string
) => {
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
    const response = await axiosInstance.get(`/api/v1/member/me`, {
      headers: {
        Authorization: `Bearer ${cookies}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 정보수정

export const updateMember = async ({
  username,
  introduction,
  profileImage,
  backgroundImage,
  cookies,
}: UpdateMemberParams) => {
  try {
    const formData = new FormData();

    if (username) {
      formData.append("username", username);
    }

    if (introduction) {
      formData.append("introduction", introduction);
    }

    if (profileImage) {
      const binaryData = Uint8Array.from(
        atob(profileImage.split(",")[1]),
        (c) => c.charCodeAt(0)
      );

      formData.append(
        "profileImage",
        new Blob([binaryData], { type: "image/png" }),
        "image.png"
      );
    }

    if (backgroundImage) {
      const binaryData = Uint8Array.from(
        atob(backgroundImage.split(",")[1]),
        (c) => c.charCodeAt(0)
      );

      formData.append(
        "backgroundImage",
        new Blob([binaryData], { type: "image/png" }),
        "image.png"
      );
    }

    const response = await axiosInstance.patch("/api/v1/member", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${cookies}`,
      },
    });

    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error updating member information:", error);
    throw error;
  }
};
