import React, { useState } from 'react';
import Header from '../../../layouts/Header/Header';
import classNames from 'classnames/bind';
import styles from '../Register/RegisterPage.module.scss';
import { RegisterAPI } from '../../../api/register/RegisterAPI';
import RegisterApiResponse from '../../../api/register/RegisterApiResponse';
import { Link } from 'react-router-dom';

const st = classNames.bind(styles);

const LoginPage: React.FC = () => {
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
                    <div className={st('title')}>Đăng nhập thành viên</div>
                    <div className={st('content')}>
                        <form onSubmit={handleSubmit}>
                            <div className={st('user-details')}>
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
                            </div>
                            <div className={st('button')}>
                                <input type="submit" value="Login" />
                            </div>
                            <span>
                                Bạn chưa có tài khoản <Link to={'/account'}>Đăng kí tại đây</Link>
                            </span>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
