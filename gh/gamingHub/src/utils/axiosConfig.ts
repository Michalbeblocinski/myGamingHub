import axios, { AxiosInstance } from "axios";

export const GhDataApi: AxiosInstance = axios.create({
  baseURL: "https://gaminghub-backend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const GhDataApiFile: AxiosInstance = axios.create({
  baseURL: "https://gaminghub-backend.onrender.com/api",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});


