import axios from "axios";

// YouTube API 호출 함수
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
    const apiKey = process.env[`REACT_APP_YOUTUBE_API_KEY_${keyIndex}`]; // 현재 인덱스에 해당하는 API 키
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${max}&q=${search}&type=video&key=${apiKey}`
    );
    console.log(apiKey);
    localStorage.setItem(cacheKey, JSON.stringify(response.data)); // 새로운 데이터 캐싱
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 403) {
      console.error(`API key ${keyIndex} exceeded its quota. Trying next key.`);
      return youtubeAPIData(max, search, keyIndex + 1); // 다음 API 키로 재시도
    } else {
      console.error(error);
      throw error;
    }
  }
};
