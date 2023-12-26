import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER}`,
});

export const axiosLoginInstance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER}`,
  headers: {
    "Content-Type": "application/json",
  },
});
