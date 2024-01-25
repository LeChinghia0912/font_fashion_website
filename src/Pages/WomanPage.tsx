import React from 'react';
import Header from '../layouts/Header/Header';
import Product from '../components/sanpham/Product';

export const WomanPage = () => {
    return (
        <div>
            <Header />

            <div style={{ marginTop: 90 }}>
                <Product />
            </div>
        </div>
    );
};
