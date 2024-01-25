import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Main.module.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { SliderAPI } from '../../api/slider/SliderAPI';
import ProductApiResponse from '../../api/product/ProductApiResponse';
import { ProductAPI } from '../../api/product/ProductAPI';
import { Link } from 'react-router-dom';
import { sliderSettings, productSliderSettings } from './mainData';

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
                        <div className={st('exclusive-content')}>
                            {loading ? (
                                <div style={{ textAlign: 'center' }}>Loading...</div>
                            ) : productData ? (
                                <Slider {...productSliderSettings}>
                                    {productData.map((products, index) => (
                                        <Link to={''} key={index}>
                                            <div className={st('card-product')}>
                                                <img
                                                    src={products.image}
                                                    alt={`Slide ${index + 1}`}
                                                    className={st('img-style-product')}
                                                />
                                                <div className={st('title-product')}>
                                                    <p>{products.name}</p>
                                                    <p>{products.productCategory}</p>
                                                    <p>Giá: {products.price}.vnđ</p>
                                                </div>
                                            </div>
                                        </Link>
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
