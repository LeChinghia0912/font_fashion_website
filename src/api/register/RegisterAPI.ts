import axios, { AxiosResponse } from 'axios';
import registerEndpoint from './registerEndpoint';
import RegisterApiResponse from './RegisterApiResponse';

interface RegisterData {
    fullName: string;
    username: string;
    email: string;
    address: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
}

export const RegisterAPI = async (data: RegisterData): Promise<RegisterApiResponse> => {
    try {
        const axiosResponse: AxiosResponse<RegisterApiResponse> = await axios.post(registerEndpoint.newAccount, data);
        return axiosResponse.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response.data as RegisterApiResponse;
        }
        throw new Error('Đã xảy ra lỗi không mong muốn trong quá trình đăng ký');
    }
};
