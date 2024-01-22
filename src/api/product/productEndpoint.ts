import instance from "../axiosClient";

const productEndpoint = {
    getAllProduct: `${instance.defaults.baseURL}product/showProduct`,
};

export default productEndpoint;
