import React, { useState } from 'react';
import Header from '../../../layouts/Header/Header';
import classNames from 'classnames/bind';
import styles from '../Register/RegisterPage.module.scss';
import { handleLogin } from '../../../api/login/LoginAPI';
import { LoginApiResponse } from '../../../api/login/LoginApiResponse';
import { Link } from 'react-router-dom';

const st = classNames.bind(styles);

const LoginPage: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const loginResponse: LoginApiResponse = await handleLogin(formData.email, formData.password);

            if (loginResponse.success) {
                alert('Đăng nhập thành công!');
                localStorage.setItem('token', loginResponse.token || '');
                // Redirect to home or another page if needed
                // e.g., history.push('/home');
            }
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert('Có lỗi xảy ra khi đăng nhập.');
            }
            console.error('Đã xảy ra lỗi khi đăng nhập!', error);
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
                                    <span className={st('details')}>Email</span>
                                    <input
                                        type="text"
                                        name="email"
                                        placeholder="Enter your email"
                                        required
                                        value={formData.email}
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
                                <input type="submit" value="Đăng nhập" />
                            </div>
                            <span>
                                Bạn chưa có tài khoản? <Link to={'/account'}>Đăng kí tại đây</Link>
                            </span>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
