import { Settings, LazyLoadTypes } from 'react-slick';

export const sliderSettings: Settings = {
    dots: true,
    arrows: true,
    lazyLoad: 'ondemand' as LazyLoadTypes | undefined,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 3000,
};

export const productSliderSettings: Settings = {
    dots: true,
    centerMode: true,
    infinite: true,
    slidesToShow: 5,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
};
