import { axiosInstance } from "@api/axiosInstance";

// 자동완성 ㅋㅋ
export const playAutoComplete = async (language: string, text: string) => {
  try {
    const response = await axiosInstance.get(`/api/v1/autocomplete/google`, {
      params: {
        language: language,
        text: text,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
