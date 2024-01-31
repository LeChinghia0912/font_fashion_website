import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Detail.module.scss';
import Header from '../../layouts/Header/Header';
import { useParams } from 'react-router-dom';
import { GetProductById } from '../../api/product/ProductAPI';
import { ProductApiResponse } from '../../api/product/ProductApiResponse';

const st = classNames.bind(styles);

const DetailsProduct: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [productDetails, setProductDetails] = useState<ProductApiResponse['details']>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    const details = await GetProductById(id);

                    if (details !== null) {
                        setProductDetails(details);
                    } else {
                        console.error('Product details not found');
                    }
                }
            } catch (error) {
                console.error('Error fetching product details', error);
            }
        };

        fetchData();
    }, [id]);

    if (!productDetails) {
        return <p style={{ textAlign: 'center' }}>No product details found.</p>;
    }

    return (
        <div>
            <Header />
            <div className={st('main')}>
                <div className={st('content')}>
                    <div className={st('section_group')}>
                        <div className={st('content-desc')}>
                            <div className={st('images')}>
                                <img src={productDetails.image} alt="" />
                            </div>
                            <div className={st('desc')}>
                                <h1>Sản phẩm: {productDetails.name}</h1>
                                <p>Danh mục: {productDetails.productCategory}</p>
                                <p>Giá: {productDetails.price}.vnđ</p>
                                <div className={st('add-cart')}>
                                    <p>Số lượng</p>
                                    <input type="number" min="1" />
                                    <button>Mua Ngay</button>
                                </div>
                                <div className={st('add-cart')}>
                                    <button style={{ marginTop: 55 }}>Thêm vào giỏ hàng</button>
                                </div>
                                <div className={st('product-desc')}>
                                    <h2>Giới thiệu</h2>
                                    <p>{productDetails.introduce}</p>
                                </div>
                            </div>
                            <div className={st('product-desc')}>
                                <h2>Chi tiết sản phẩm</h2>
                                <p>{productDetails.detail}</p>
                            </div>
                            <div className={st('product-desc')}>
                                <h2>Bảo quản</h2>
                                <p>{productDetails.preserve}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsProduct;
