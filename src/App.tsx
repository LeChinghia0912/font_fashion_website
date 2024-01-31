import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { MenPage } from './Pages/MenPage';
import { WomanPage } from './Pages/WomanPage';
import { ChildrenPage } from './Pages/ChildrenPage';
import DetailsProduct from './Pages/Details/DetailsProduct';

const App: React.FC = () => {
    return (
        <BrowserRouter basename="/">
            <Routes>
                <Route path="/" element={<MainLayout />} />
                <Route path="/nam" element={<MenPage />} />
                <Route path="/nữ" element={<WomanPage />} />
                <Route path="/trẻ_em" element={<ChildrenPage />} />
                <Route path="/detail/:id" Component={DetailsProduct} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
