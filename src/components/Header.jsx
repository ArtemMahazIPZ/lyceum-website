import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../lyceumimages/logo.jpg';
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import UserContext from "../context/userContext";

const Header = () => {
    const [isNavShowing, setIsNavShowing] = useState(window.innerWidth > 800);
    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        const handleResize = () => {
            setIsNavShowing(window.innerWidth > 800);
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const closeNavHandler = () => {
        if (window.innerWidth <= 800) {
            setIsNavShowing(false);
        }
    };

    return (
        <nav>
            <div className="container nav_container">
                <Link to="/" className="nav_logo" onClick={closeNavHandler}>
                    <img src={Logo} alt="Navbar Logo" />
                </Link>
                {currentUser?.id && (
                    <ul className={`nav_menu ${isNavShowing ? 'show' : ''}`}>
                        <li><Link to={`/profile/${currentUser.id}`} onClick={closeNavHandler}>{currentUser.name}</Link></li>
                        <li><Link to="/create" onClick={closeNavHandler}>Створити новину</Link></li>
                        <li><Link to="/authors" onClick={closeNavHandler}>Автори</Link></li>
                        <li><Link to="/logout" onClick={closeNavHandler}>Вийти</Link></li>
                    </ul>
                )}
                {!currentUser?.id && (
                    <ul className={`nav_menu ${isNavShowing ? 'show' : ''}`}>
                        <li><Link to="/authors" onClick={closeNavHandler}>Автори</Link></li>
                        <li><Link to="/login" onClick={closeNavHandler}>Увійти</Link></li>
                    </ul>
                )}
                <button className="nav_toggle-btn" onClick={() => setIsNavShowing(!isNavShowing)}>
                    {isNavShowing ? <AiOutlineClose /> : <FaBars />}
                </button>
            </div>
        </nav>
    );
}

export default Header;
