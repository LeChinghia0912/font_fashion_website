import axios, { AxiosResponse } from 'axios';
import ProductApiResponse from './ProductApiResponse';
import productEndpoint from './productEndpoint';

export const ProductAPI = async (): Promise<ProductApiResponse['products']> => {
    try {
        const response: AxiosResponse<ProductApiResponse> = await axios.get(productEndpoint.getAllProduct);
        console.log('Response Data Product:', response.data);
        return response.data.products;
    } catch (error) {
        throw error;
    }
};
