import axios from "axios";
import { store } from "./store"; // adjust this path
import { showLoader, hideLoader } from "./loaderSlice";

const api = axios.create({
  baseURL: "http://192.168.1.14:8888/api/v1/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    store.dispatch(showLoader());
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    store.dispatch(hideLoader());
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    store.dispatch(hideLoader());
    return response;
  },
  (error) => {
    store.dispatch(hideLoader());
    return Promise.reject(error);
  }
);

export default api;
