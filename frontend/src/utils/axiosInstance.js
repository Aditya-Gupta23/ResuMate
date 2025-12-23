import axios from 'axios';
import { BASE_URL } from './apiPaths';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 12000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    },
    withCredentials: true, // important for refreshToken cookie
});

// Request Interceptor → attach accessToken
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor → refresh on 401
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
            // Call refresh endpoint (refreshToken comes from HttpOnly cookie automatically)
            const refreshRes = await axios.post(
                `${BASE_URL}/api/v1/auth/refresh`,
                {},
                { withCredentials: true }
            );

            const newAccessToken = refreshRes.data.accessToken;

            // Save new token
            localStorage.setItem("accessToken", newAccessToken);

            // Retry original request with new token
            originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            } catch (err) {
                console.error("Refresh token failed:", err);
                localStorage.removeItem("accessToken");
                window.location.href = '/'; // force logout
            }
        }

        if (error.code === 'ECONNABORTED') {
            console.error("Request timeout");
        }
        if (error.response?.status === 500) {
            console.error("Server Error");
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
