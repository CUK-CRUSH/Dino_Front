import axios from "axios";

export const youtubeAPIData = async (
  max: number,
  search: string,
  keyIndex: number = 0
): Promise<any> => {
  const cacheKey = `youtube-search-${search}-${max}`;
  const cachedData = localStorage.getItem(cacheKey);

  if (cachedData) {
    return JSON.parse(cachedData); // 캐시된 데이터가 있으면 반환
  }

  try {
    // API 키 인덱스가 13을 초과할 경우 0으로 리셋
    const apiKeyIndex = keyIndex % 14; // 0~13 사이의 값을 유지
    const apiKey = process.env[`REACT_APP_YOUTUBE_API_KEY_${apiKeyIndex}`];

    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${max}&q=${search}&type=video&key=${apiKey}`
    );

    localStorage.setItem(cacheKey, JSON.stringify(response.data)); // 새로운 데이터 캐싱
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 403) {
      console.error(`API key ${keyIndex} exceeded its quota. Trying next key.`);
      const nextKeyIndex = (keyIndex + 1) % 14; // 다음 인덱스, 13을 초과하면 0으로 리셋
      return youtubeAPIData(max, search, nextKeyIndex); // 다음 API 키로 재시도
    } else {
      console.error(error);
      throw error;
    }
  }
};