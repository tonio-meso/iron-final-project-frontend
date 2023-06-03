import axios from "axios";

const service = axios.create({
  baseURL:
    import.meta.env.VITE_BACKEND_URL ||
    "https://movie-match-maker-service.onrender.com/",
});

service.interceptors.request.use((interceptedRequest) => {
  interceptedRequest.headers.Authorization = `Bearer ${localStorage.getItem(
    "token"
  )}`;
  return interceptedRequest;
});

export default service;
