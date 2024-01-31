import instance from '../axiosClient';

const productEndpoint = {
    getAllProduct: `${instance.defaults.baseURL}product/showProduct`,
    getProductById: (id: string) => `${instance.defaults.baseURL}product/detailProduct/${id}`,
};

export default productEndpoint;
