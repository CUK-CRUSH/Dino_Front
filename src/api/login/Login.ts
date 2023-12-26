import { axiosLoginInstance } from "@api/axiosInstance";
import { AxiosResponse } from "axios";

interface LoginDTO {
  accessToken: string;
}

export async function getLogin(): Promise<LoginDTO | null> {
  try {
    const response: AxiosResponse = await axiosLoginInstance.get(
      `/login/google`
    );

    const loginData: LoginDTO = {
      accessToken: response.headers["Location"],
    };

    return loginData;
  } catch (error) {
    console.error("로그인 요청 중 오류가 발생했습니다:", error);
    return null;
  }
}
