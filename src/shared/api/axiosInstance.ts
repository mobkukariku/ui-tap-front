import axios, {AxiosError} from "axios";

const API_URL = "/api"; // 👈 теперь без IP

export const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});


api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
        }
        return Promise.reject(error);
    }
);


