import instance from '../axiosClient';

const registerEndpoint = {
    newAccount: `${instance.defaults.baseURL}account/newAccount`,
};

export default registerEndpoint;
