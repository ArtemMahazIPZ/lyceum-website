import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer>
            <ul className="footer_categories">
                <li><Link to="/posts/categories/Екзамени">Екзамени</Link></li>
                <li><Link to="/posts/categories/Спорт">Спорт</Link></li>
                <li><Link to="/posts/categories/Досягнення">Досягнення</Link></li>
                <li><Link to="/posts/categories/Кримінал">Кримінал</Link></li>
                <li><Link to="/posts/categories/Діджиталізація">Діджиталізація</Link></li>
                <li><Link to="/posts/categories/Карантин">Карантин</Link></li>
                <li><Link to="/posts/categories/Трагедії">Трагедії</Link></li>
                <li><Link to="/posts/categories/Зарахування">Зарахування</Link></li>
            </ul>
            <div className="footer_copyright">
                <small>&copy; Lyceum69</small>
            </div>
        </footer>
    )
}

export default Footer
