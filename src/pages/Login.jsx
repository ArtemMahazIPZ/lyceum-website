import React, { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import UserContext from '../context/userContext'; // Імпорт без фігурних дужок

const Login = () => {
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { setCurrentUser } = useContext(UserContext);

    const changeInputHandler = (e) => {
        setUserData(prevState => {
            return { ...prevState, [e.target.name]: e.target.value };
        });
    };

    const loginUser = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`, userData);
            const user = response.data;
            setCurrentUser(user);
            navigate('/');
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Щось пішло не так';
            setError(errorMessage);
        }
    };

    return (
        <section className="login">
            <div className="container">
                <h2>Вхід в обліковий запис</h2>
                <form className="form login_form" onSubmit={loginUser}>
                    {error && <p className="form_error-message">{error}</p>}
                    <input type="text" placeholder='Email' name='email' value={userData.email}
                           onChange={changeInputHandler} autoFocus />
                    <input type="password" placeholder='Пароль' name='password' value={userData.password}
                           onChange={changeInputHandler} />
                    <button type="submit" className="btn primary">Увійти</button>
                </form>
                <small>У Вас немає акаунта?<Link to="/register"> Зареєструйтеся</Link></small>
            </div>
        </section>
    );
};

export default Login;
