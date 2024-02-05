import axios from "axios";

export const youtubeAPIData = async (search: string) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${search}&type=video&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
