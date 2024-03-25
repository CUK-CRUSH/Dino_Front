import axios from "axios";

export const youtubeAPIData = async (max: number, search: string) => {
  const cacheKey = `youtube-search-${search}-${max}`;
  const cachedData = localStorage.getItem(cacheKey);
  if (cachedData) {
    return JSON.parse(cachedData); // Return cached data if available
  }
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${max}&q=${search}&type=video&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
    );
    localStorage.setItem(cacheKey, JSON.stringify(response.data)); // Cache the new data
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
