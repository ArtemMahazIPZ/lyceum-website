import React, {useState} from 'react'
import {Link} from "react-router-dom";

const Register = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })
    const changeInputHandler = (e) => {
        setUserData(prevState => {
            return { ...prevState, [e.target.name]: e.target.value }
        })
    }


    return (
        <section className="register">
            <div className="container">
                <h2>Реєстрація</h2>
                <form className="form register_form">
                    <p className="form_error-message">Повідомлення про помилку</p>
                    <input type="text" placeholder="Ім'я" name='name' value={userData.name}
                           onChange={changeInputHandler}/>
                    <input type="text" placeholder='Email' name='email' value={userData.email}
                           onChange={changeInputHandler}/>
                    <input type="password" placeholder='Пароль' name='password' value={userData.password}
                           onChange={changeInputHandler}/>
                    <input type="password" placeholder='Підтвердіть пароль' name='password2' value={userData.password2}
                           onChange={changeInputHandler}/>
                    <button type="submit" className="btn primary">Зареєструватися</button>
                </form>
                <small>У Вас вже є обліковий запис? <Link to="/login">Увійдіть</Link></small>
            </div>
        </section>
    )
}

export default Register