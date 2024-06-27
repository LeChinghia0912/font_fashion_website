import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { MenPage } from '../Pages/MenPage';
import { WomanPage } from '../Pages/WomanPage';
import { ChildrenPage } from '../Pages/ChildrenPage';
import RegisterPage from '../Pages/Account/Register/RegisterPage';
import { SupportPage } from '../Pages/SupportPage';
import DetailsProduct from '../Pages/Details/DetailsProduct';
import LoginPage from '../Pages/Account/Login/LoginPage';

const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter basename="/">
            <Routes>
                <Route path="/" element={<MainLayout />} />
                <Route path="/nam" element={<MenPage />} />
                <Route path="/nữ" element={<WomanPage />} />
                <Route path="/trẻ_em" element={<ChildrenPage />} />
                <Route path="/detail/:id" Component={DetailsProduct} />
                <Route path="/help" element={<SupportPage />} />
                <Route path="/account" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
