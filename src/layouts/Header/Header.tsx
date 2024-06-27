import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faHeadphones, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.scss';
import { MenuAPI } from '../../api/menu/MenuAPI';
import { Link } from 'react-router-dom';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

const st = classNames.bind(styles);

interface ActionItemProps {
    icon: IconDefinition;
    to: string;
    text?: string;
}

const ActionItem: React.FC<ActionItemProps> = ({ icon, to, text }) => (
    <div className={st('item-wallet')}>
        <Link to={to}>
            <FontAwesomeIcon icon={icon} />
            {text && <span>{text}</span>}
        </Link>
    </div>
);

const Header: React.FC = () => {
    const [menuData, setMenuData] = useState<string[]>([]);

    useEffect(() => {
        const fetchMenuData = async () => {
            try {
                const data = await MenuAPI();
                setMenuData(data || []);
            } catch (error) {
                console.error('Error fetching menu data:', error);
            }
        };

        fetchMenuData();
    }, []);

    const renderMenuItems = () => (
        <ul style={{ display: 'flex' }}>
            {menuData.map((item, index) => (
                <li key={index}>
                    <Link to={`/${item.toLowerCase()}`}>{item}</Link>
                </li>
            ))}
        </ul>
    );

    return (
        <header className={st('site-header')}>
            <div className={st('container')}>
                <nav className={st('main-menu')}>{renderMenuItems()}</nav>
                <Link to="/">
                    <div className={st('site-brand')}></div>
                </Link>
                <div className={st('right-header')}>
                    <form className={st('search-form')}>
                        <button type="submit" className={st('submit')}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                        <input type="text" placeholder="Tìm kiếm sản phẩm" />
                    </form>
                    <div className={st('header-actions')}>
                        <ActionItem icon={faHeadphones} to="/help" />
                        <ActionItem icon={faUser} to="/account" />
                        <ActionItem icon={faBagShopping} to="/cart" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
