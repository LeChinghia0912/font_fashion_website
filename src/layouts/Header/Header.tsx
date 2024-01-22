import React from 'react';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faHeadphones, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.scss';
import { MenuAPI } from '../../api/menu/MenuAPI';

const st = classNames.bind(styles);

const Header = () => {
    const [menuData, setMenuData] = useState<string[]>([]);

    useEffect(() => {
        const fetchMenuData = async () => {
            try {
                const data = await MenuAPI();
                console.log('Fetched menu data:', data);
                setMenuData(data);
            } catch (error) {
                console.error('Error fetching menu data:', error);
            }
        };

        fetchMenuData();
    }, []);

    const renderMenuItems = () => {
        return menuData.map((item, index) => (
            <li key={index}>
                <a style={{ fontSize: 14 }}>{item}</a>
            </li>
        ));
    };

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
                        <div className={st('item-wallet')}>
                            <FontAwesomeIcon icon={faHeadphones} />
                        </div>
                        <div className={st('item-wallet')}>
                            <FontAwesomeIcon icon={faUser} />
                        </div>
                        <div className={st('item-wallet')}>
                            <FontAwesomeIcon icon={faBagShopping} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
