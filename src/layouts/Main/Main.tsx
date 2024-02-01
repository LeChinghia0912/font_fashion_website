import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Main.module.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { SliderAPI } from '../../api/slider/SliderAPI';
import { ProductAPI } from '../../api/product/ProductAPI';
import { Link } from 'react-router-dom';
import { sliderSettings, productSliderSettings } from './mainData';
import { Product } from '../../api/product/ProductApiResponse';
import blog from '../../assets/images/blog.jpg';

const st = classNames.bind(styles);

const Main = () => {
    const [sliderData, setSliderData] = useState<string[]>([]);
    const [productData, setProductData] = useState<Product[]>([]);
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
                            ) : productData.length > 0 ? (
                                <Slider {...productSliderSettings}>
                                    {productData.map((product, index) => (
                                        <Link to={`/detail/${product._id}`} key={index}>
                                            <div className={st('card-product')}>
                                                <img
                                                    src={product.image}
                                                    alt={`Product ${index + 1}`}
                                                    className={st('img-style-product')}
                                                />
                                                <div className={st('title-product')}>
                                                    <p>{product.name}</p>
                                                    <p>{product.productCategory}</p>
                                                    <p>Giá: {product.price}.vnđ</p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </Slider>
                            ) : (
                                <div>No product data available</div>
                            )}
                        </div>
                        <div className={st('link-product')}>
                            <Link to={''} className={st('all-product')}>
                                Xem tất cả
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className={st('home-trending')}>
                <div className={st('content-trending')}>
                    <img src={blog} alt="" style={{ maxWidth: '100%' }} />
                </div>
            </div>
        </div>
    );
};

export default Main;
