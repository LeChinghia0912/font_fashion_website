import axios, { AxiosResponse } from 'axios';
import menuEndpoint from './menuEndpoint';
import MenuApiResponse from './MenuApiResponse';

export const MenuAPI = async (): Promise<string[]> => {
    try {
        const response: AxiosResponse<MenuApiResponse> = await axios.get(menuEndpoint.getAllMenu);
        console.log('MenuAPI Response Data:', response.data);

        return response.data.category;
    } catch (error) {
        console.error('MenuAPI Error:', error);
        throw error;
    }
};
