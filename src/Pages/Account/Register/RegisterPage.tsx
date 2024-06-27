import React, { useState } from 'react';
import Header from '../../../layouts/Header/Header';
import classNames from 'classnames/bind';
import styles from './RegisterPage.module.scss';
import { RegisterAPI } from '../../../api/register/RegisterAPI';
import RegisterApiResponse from '../../../api/register/RegisterApiResponse';
import { Link } from 'react-router-dom';

const st = classNames.bind(styles);

const RegisterPage: React.FC = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        address: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const registerResponse: RegisterApiResponse = await RegisterAPI(formData);
            alert(registerResponse.message);
        } catch (error) {
            console.error('Đã xảy ra lỗi khi đăng ký tài khoản!', error);
            alert('Có lỗi xảy ra khi đăng kí tài khoản');
        }
    };

    return (
        <>
            <Header />
            <div style={{ marginTop: 90 }}>
                <div className={st('container')}>
                    <div className={st('title')}>Đăng kí thành viên</div>
                    <div className={st('content')}>
                        <form onSubmit={handleSubmit}>
                            <div className={st('user-details')}>
                                <div className={st('input-box')}>
                                    <span className={st('details')}>Full Name</span>
                                    <input
                                        type="text"
                                        name="fullName"
                                        placeholder="Enter your name"
                                        required
                                        value={formData.fullName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className={st('input-box')}>
                                    <span className={st('details')}>Username</span>
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Enter your username"
                                        required
                                        value={formData.username}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className={st('input-box')}>
                                    <span className={st('details')}>Email</span>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className={st('input-box')}>
                                    <span className={st('details')}>Address</span>
                                    <input
                                        type="text"
                                        name="address"
                                        placeholder="Enter your address"
                                        required
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className={st('input-box')}>
                                    <span className={st('details')}>Phone Number</span>
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        placeholder="Enter your number"
                                        required
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className={st('input-box')}>
                                    <span className={st('details')}>Password</span>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className={st('input-box')}>
                                    <span className={st('details')}>Confirm Password</span>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm your password"
                                        required
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className={st('button')}>
                                <input type="submit" value="Register" />
                            </div>
                            <span>
                                Bạn đã có tài khoản <Link to={'/login'}>Đăng nhập tại đây</Link>
                            </span>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;
