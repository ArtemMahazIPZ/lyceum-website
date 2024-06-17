import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer>
            <ul className="footer_categories">
                <li><Link to="/posts/categories/Exams">Екзамени</Link></li>
                <li><Link to="/posts/categories/Sport">Спорт</Link></li>
                <li><Link to="/posts/categories/Achievements">Досягнення</Link></li>
                <li><Link to="/posts/categories/Crime">Кримінал</Link></li>
                <li><Link to="/posts/categories/Digitalization">Діджиталізація</Link></li>
                <li><Link to="/posts/categories/Quarantine">Карантин</Link></li>
                <li><Link to="/posts/categories/Tragedies">Трагедії</Link></li>
                <li><Link to="/posts/categories/Admission">Вступ до ліцею</Link></li>
            </ul>
            <div className="footer_copyright">
                <small>&copy; Lyceum69</small>
            </div>
        </footer>
    )
}

export default Footer
