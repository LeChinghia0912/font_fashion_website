import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Main.module.scss';
import Slider, { Settings, LazyLoadTypes } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { SliderAPI } from '../../api/slider/SliderAPI';
import ProductApiResponse from '../../api/product/ProductApiResponse';
import { ProductAPI } from '../../api/product/ProductAPI';

const st = classNames.bind(styles);

const Main = () => {
    const [sliderData, setSliderData] = useState<string[]>([]);
    const [productData, setProductData] = useState<ProductApiResponse['products']>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const sliderResponse = await SliderAPI();
                const productResponse = await ProductAPI();
                setSliderData(sliderResponse);
                setProductData(productResponse);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const sliderSettings: Settings = {
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

    const settingsProductWoman: Settings = {
        className: 'center',
        centerMode: true,
        infinite: true,
        centerPadding: '10px',
        slidesToShow: 5,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    const imgProducStyle = {
        maxWidth: '70%',
        marginLeft: 'auto',
        marginRight: 'auto',
    };

    return (
        <div className={st('site-main')}>
            <div className={st('container')}>
                <section className={st('home-banner')}>
                    {loading ? (
                        <div style={{ textAlign: 'center' }}>Loading...</div>
                    ) : (
                        <Slider {...sliderSettings}>
                            {sliderData.map((image, index) => (
                                <div key={index}>
                                    <img src={image} alt={`Slide ${index + 1}`} style={{ maxWidth: '100%' }} />
                                </div>
                            ))}
                        </Slider>
                    )}
                </section>
            </div>
            <div className={st('home-new-prod')}>
                <div className={st('title-section')}>DANH MỤC SẢN PHẨM</div>
                <div className={st('exclusive-tabs')}>
                    <div className={st('exclusive-head')}>
                        <div className={st(' exclusive-content')}>
                            {loading ? (
                                <div style={{ textAlign: 'center' }}>Loading...</div>
                            ) : productData ? (
                                <Slider {...settingsProductWoman}>
                                    {productData.map((products, index) => (
                                        <div key={index}>
                                            <img
                                                src={products.image}
                                                alt={`Slide ${index + 1}`}
                                                style={imgProducStyle}
                                            />
                                            <div style={{ textAlign: 'center', marginTop: 20 }}>
                                                <div>{products.name}</div>
                                                <div>{products.productCategory}</div>
                                                <div>{products.price} .vnđ</div>
                                            </div>
                                        </div>
                                    ))}
                                </Slider>
                            ) : (
                                <div>No product data available</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
