import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const changeInputHandler = (e) => {
        setUserData(prevState => {
            return { ...prevState, [e.target.name]: e.target.value }
        });
    };

    const registerUser = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/register`, userData);
            console.log('Response:', response); // Для перевірки відповіді сервера
            const newUser = response.data;
            if (!newUser) {
                setError("Не можна зареєструвати користувача. Спробуйте ще раз");
                return;
            }
            navigate('/');
        } catch (err) {
            console.error('Error:', err.response); // Для перевірки помилок
            const errorMessage = err.response?.data?.message || 'Щось пішло не так';
            setError(errorMessage);
        }
    };

    return (
        <section className="register">
            <div className="container">
                <h2>Реєстрація</h2>
                <form className="form register_form" onSubmit={registerUser}>
                    {error && <p className="form_error-message">{error}</p>}
                    <input type="text" placeholder="Ім'я" name='name' value={userData.name}
                           onChange={changeInputHandler} />
                    <input type="text" placeholder='Email' name='email' value={userData.email}
                           onChange={changeInputHandler} />
                    <input type="password" placeholder='Пароль' name='password' value={userData.password}
                           onChange={changeInputHandler} />
                    <input type="password" placeholder='Підтвердіть пароль' name='password2' value={userData.password2}
                           onChange={changeInputHandler} />
                    <button type="submit" className="btn primary">Зареєструватися</button>
                </form>
                <small>У Вас вже є обліковий запис? <Link to="/login">Увійдіть</Link></small>
            </div>
        </section>
    );
};

export default Register;
