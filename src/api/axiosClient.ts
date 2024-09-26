import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

const instance: AxiosInstance = axios.create({
    baseURL: 'http://192.168.1.8:8000/',
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.response.use(
    (response: AxiosResponse) => {
        // Trả về dữ liệu từ response
        return response.data;
    },
    (error: AxiosError) => {
        // Xử lý lỗi
        return Promise.reject(error);
    },
);

export default instance;
