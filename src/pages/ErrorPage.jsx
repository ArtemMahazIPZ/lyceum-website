import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <section className="error-page">
            <div className="center">
                <Link to="/" className="btn primary">Повернутися на головну</Link>
                <h2>Сторінка не знайдена</h2>
            </div>
        </section>
    );
};

export default ErrorPage;
