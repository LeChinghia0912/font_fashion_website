import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBagShopping,
    faHeadphones,
    faMagnifyingGlass,
    faUser,
    IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.scss';
import { MenuAPI } from '../../api/menu/MenuAPI';
import { Link } from 'react-router-dom';

const st = classNames.bind(styles);

const Header = () => {
    const [menuData, setMenuData] = useState<string[]>([]);

    useEffect(() => {
        const fetchMenuData = async () => {
            try {
                const data = await MenuAPI();
                console.log('Fetched menu data:', data);
                setMenuData(data || []);
            } catch (error) {
                console.error('Error fetching menu data:', error);
            }
        };

        fetchMenuData();
    }, []);

    const renderMenuItems = () => (
        <>
            {menuData.map((item, index) => (
                <li key={index}>
                    <Link to={`/${item.toLowerCase()}`}>{item}</Link>
                </li>
            ))}
        </>
    );

    const renderActionItem = (icon: IconDefinition, to: string) => (
        <div className={st('item-wallet')} key={to}>
            <Link to={to}>
                <FontAwesomeIcon icon={icon} />
            </Link>
        </div>
    );

    return (
        <div className={st('site-header')}>
            <div className={st('container')}>
                <nav className={st('main-menu')}>{renderMenuItems()}</nav>
                <div className={st('site-brand')}></div>
                <div className={st('right-header')}>
                    <form className={st('search-form')}>
                        <button className={st('submit')}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                        <input type="text" placeholder="Tìm kiếm sản phẩm" />
                    </form>
                    <div className={st('header-actions')}>
                        {renderActionItem(faHeadphones, 'help')}
                        {renderActionItem(faUser, 'info')}
                        {renderActionItem(faBagShopping, 'cart')}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
