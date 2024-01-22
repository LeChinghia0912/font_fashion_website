import instance from "../axiosClient";

const sliderEndpoint = {
    getAllSlider: `${instance.defaults.baseURL}slider/showSlider`,
};

export default sliderEndpoint;
