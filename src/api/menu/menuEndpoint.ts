import instance from "../axiosClient";

const menuEndpoint = {
    getAllMenu: `${instance.defaults.baseURL}category/showCategory`,
};

export default menuEndpoint;
