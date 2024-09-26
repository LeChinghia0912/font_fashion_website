import instance from '../axiosClient';

const loginEndpoint = {
    loginAccount: `${instance.defaults.baseURL}/login`,
    userData: `${instance.defaults.baseURL}/userData`,
};

export default loginEndpoint;

export interface LoginApiResponse {
    success: boolean;
    message: string;
    token?: string;
    user?: {
        id: string;
        email: string;
    }; // Không cần password ở đây
}
