import axios, { AxiosResponse } from 'axios';
import { ProductApiResponse } from './ProductApiResponse';
import productEndpoint from './productEndpoint';

export const ProductAPI = async (): Promise<ProductApiResponse['products']> => {
    try {
        const response: AxiosResponse<ProductApiResponse> = await axios.get(productEndpoint.getAllProduct);
        return response.data.products;
    } catch (error) {
        throw error;
    }
};

export const GetProductById = async (productId: string): Promise<ProductApiResponse['details']> => {
    try {
        const response: AxiosResponse<ProductApiResponse> = await axios.get(productEndpoint.getProductById(productId));

        const details = response.data.details;

        if (details !== undefined) {
            return details;
        } else {
            console.error('Product details not found');
            return null;
        }
    } catch (error) {
        console.error('Error fetching product details', error);
        return null;
    }
};
