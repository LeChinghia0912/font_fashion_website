import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

const instance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8000/',
});

instance.interceptors.response.use(
    (response: AxiosResponse) => {
        // Trả về dữ liệu từ response
        return response.data;
    },
    (error: AxiosError) => {
        // Xử lý lỗi
        return Promise.reject(error);
    }
);

export default instance;
