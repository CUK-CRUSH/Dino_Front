import axios from "axios";

export const apiUrl = "https://api.unsplash.com/search/photos";

export const getAccessTokenData = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_SERVER}/login/google`);
    return res.data;
  } catch (error) {
    return error.message;
  }
};
