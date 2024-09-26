import instance from '../axiosClient';
import { LoginApiResponse } from './LoginApiResponse';
import loginEndpoint from './loginEndpoint';

export const handleLogin = async (email: string, password: string): Promise<LoginApiResponse> => {
    try {
        const response = await instance.post<LoginApiResponse>(loginEndpoint.loginAccount, { email, password });

        if (response.data && response.data.success) {
            alert('Đăng nhập thành công');
            return response.data;
        } else {
            const errorMsg = 'Thông tin đăng nhập hoặc mật khẩu không chính xác';
            console.error('Đăng nhập thất bại:', errorMsg);
            throw new Error(errorMsg);
        }
    } catch (error: any) {
        if (error.response) {
            const errorMessage = error.response.data.message || 'Có lỗi xảy ra khi đăng nhập.';
            console.error('Lỗi từ máy chủ:', error.response);
            throw new Error(errorMessage);
        } else if (error.request) {
            console.error('Lỗi kết nối đến máy chủ:', error.request);
            throw new Error('Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng của bạn.');
        } else {
            console.error('Lỗi không mong muốn:', error.message);
            throw new Error('Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại sau.');
        }
    }
};
