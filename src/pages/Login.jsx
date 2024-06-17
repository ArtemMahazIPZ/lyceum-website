import React, {useState} from 'react'
import {Link} from "react-router-dom";

const Login = () => {
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    })
    const changeInputHandler = (e) => {
        setUserData(prevState => {
            return { ...prevState, [e.target.name]: e.target.value }
        })
    }


    return (
        <section className="login">
            <div className="container">
                <h2>Вхід в обліковий запис</h2>
                <form className="form login_form">
                    <p className="form_error-message">Повідомлення про помилку</p>
                    <input type="text" placeholder='Email' name='email' value={userData.email}
                           onChange={changeInputHandler}/>
                    <input type="password" placeholder='Пароль' name='password' value={userData.password}
                           onChange={changeInputHandler}/>
                    <button type="submit" className="btn primary">Увійти</button>
                </form>
                <small>У Вас немає акаунта?<Link to="/register"> Зареєструйтеся</Link></small>
            </div>
        </section>
    )
}

export default Login