import axios, {AxiosError} from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://10.36.40.36:8080/api";

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
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


