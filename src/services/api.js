import axios from "axios";

export const API_BASE_URL = 'http://localhost:8080';

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Thêm interceptors từ src/config/ApiConfig.js
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("jwt");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error);
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("jwt");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);