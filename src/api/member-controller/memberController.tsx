import { axiosInstance } from "@api/axiosInstance";
import { UpdateMemberParams } from "types/AdminEdit";

// 특정 회원 정보 조회
export const getMember = async (id: string | null) => {
  try {
    const response = await axiosInstance.get(`/api/v1/member/id/${id}`, {
      // headers: {
      //   Authorization: `Bearer ${cookies}`,
      // },
    });
    if (response) { return response.data; }
    else { return }
  } catch (error) {
    window.location.replace('/404')

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
    if (response) { return response.data; }
    else { return }
  } catch (error) {
    console.log(error);
    window.location.replace('/404')

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
    if (response) { return response.data; }
    else { return }
  } catch (error) {
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
    if (response) { return response.data; }
    else { return }
  } catch (error) {
    throw error;
  }
};

//회원 탈퇴
export const deleteAccount = async (cookies?: string) => {
  try {
    // Include the token in the Authorization header
    const response = await axiosInstance.delete('/api/v1/member/me', {
      headers: {
        Authorization: `Bearer ${cookies}`
      }
    });

    if (response.status === 200) {
      console.log('Account deletion successful');
    } else {
      console.log('Account deletion failed');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

// 정보수정

export const updateMember = async ({
  username,
  introduction,
  profileImage,
  backgroundImage,
  cookies,
  deleteProfileImage,
  deleteBackgroundImage
}: UpdateMemberParams) => {
  try {
    const formData = new FormData();
    if (deleteProfileImage) {
      formData.append("deleteProfileImage", deleteProfileImage.toString())
    }
    if (deleteBackgroundImage) {
      formData.append("deleteBackgroundImage", deleteBackgroundImage.toString())
    }
    if (username) {
      formData.append("username", username);
    }

    formData.append("introduction", introduction);

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

    const response = await axiosInstance.patch("/api/v1/member/me", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${cookies}`,
      },
    });
    if (response) { return response.data; }
    else { return }
  }
  catch (error) {
    throw error;
  }
};
