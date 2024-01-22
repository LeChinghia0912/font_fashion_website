import axios, { AxiosResponse } from 'axios';
import sliderEndpoint from './sliderEndpoint';
import SliderApiResponse from './SliderApiResponse';

export const SliderAPI = async (): Promise<string[]> => {
    try {
        const response: AxiosResponse<SliderApiResponse> = await axios.get(sliderEndpoint.getAllSlider);
        console.log('Response Data Slider:', response.data);
        return response.data.image;
    } catch (error) {
        throw error;
    }
};
