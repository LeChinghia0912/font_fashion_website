import React from 'react';
import classNames from 'classnames/bind';
import styles from './Product.module.scss';

const st = classNames.bind(styles);

const Product = () => {
    return (
        <div className={st('container')}>
            <div className={st('product')}>
                <div className={st('product-container')}>
                    <div className={st('product-navbar')}>
                        <div className={st('product-category')}>
                            <div className={st('category-list')}>
                                <ul>
                                    <li>Nam</li>
                                </ul>
                                <ul>
                                    <li>nữ</li>
                                </ul>
                                <ul>
                                    <li>trẻ em</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={st('product-list')}></div>
                </div>
            </div>
        </div>
    );
};

export default Product;
