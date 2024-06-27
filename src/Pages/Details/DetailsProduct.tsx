import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Detail.module.scss';
import Header from '../../layouts/Header/Header';
import { Link, useParams } from 'react-router-dom';
import { GetProductById } from '../../api/product/ProductAPI';
import { ProductApiResponse } from '../../api/product/ProductApiResponse';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const st = classNames.bind(styles);

interface DetailsProductProps {}

const DetailsProduct: React.FC<DetailsProductProps> = () => {
    const { id } = useParams<{ id: string }>();
    const [productDetails, setProductDetails] = useState<ProductApiResponse['details'] | null>(null);

    const [hovered, setHovered] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const imageRef = useRef<HTMLImageElement | null>(null);

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

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (imageRef.current && hovered) {
            const { left, top, width, height } = imageRef.current.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;
            setPosition({ x, y });
        }
    };

    const addToCart = () => {
        console.log('đã thêm sản phẩm vào giỏ hàng');
    };

    return (
        <div>
            <Header />
            <div className={st('main')}>
                <div className={st('content')}>
                    <div className={st('section_group')}>
                        <div className={st('content-desc')}>
                            <div className={st('images')} onMouseMove={handleMouseMove}>
                                <img
                                    src={productDetails.image}
                                    alt=""
                                    ref={imageRef}
                                    onMouseEnter={() => setHovered(true)}
                                    onMouseLeave={() => {
                                        setHovered(false);
                                        setPosition({ x: 0, y: 0 });
                                    }}
                                    style={{
                                        transformOrigin: `${position.x * 100}% ${position.y * 100}%`,
                                    }}
                                />
                            </div>
                            <div className={st('desc')}>
                                <h1>Sản phẩm: {productDetails.name}</h1>
                                <p>Danh mục: {productDetails.productCategory}</p>
                                <p>Giá: {productDetails.price}.vnđ</p>
                                <div className={st('buy-now')}>
                                    <p>Số lượng</p>
                                    <input type="number" defaultValue={'1'} min="1" />
                                    <div className={st('btn-buy-now')}>
                                        <Link to={''}>
                                            <span>MUA NGAY</span>
                                        </Link>
                                    </div>
                                </div>
                                <div className={st('add-cart')}>
                                    <button onClick={addToCart}>
                                        <span>THÊM VÀO GIỎ HÀNG</span>
                                    </button>

                                    <div className={st('btn-like')}>
                                        <Link to={''}>
                                            <span>
                                                <FontAwesomeIcon icon={faHeart} />
                                            </span>
                                        </Link>
                                    </div>
                                </div>

                                <div className={st('product-desc')}>
                                    <h2>Giới thiệu</h2>
                                    <p>{productDetails.introduce}</p>
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
        </div>
    );
};

export default DetailsProduct;
