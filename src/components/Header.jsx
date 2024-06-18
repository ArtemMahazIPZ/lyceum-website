import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../lyceumimages/logo.jpg';
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

const Header = () => {
    const [isNavShowing, setIsNavShowing] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 800) {
                setIsNavShowing(true);
            } else {
                setIsNavShowing(false);
            }
        };

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const closeNavHandler = () => {
        setIsNavShowing(false);
    };

    return (
        <nav>
            <div className="container nav_container">
                <Link to="/" className="nav_logo" onClick={closeNavHandler}>
                    <img src={Logo} alt="Navbar Logo" />
                </Link>
                {isNavShowing && (
                    <ul className="nav_menu">
                        <li><Link to="/profile/sdfsdf" onClick={closeNavHandler}>Ernest Achiever</Link></li>
                        <li><Link to="/create" onClick={closeNavHandler}>Create Post</Link></li>
                        <li><Link to="/authors" onClick={closeNavHandler}>Authors</Link></li>
                        <li><Link to="/logout" onClick={closeNavHandler}>Logout</Link></li>
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
