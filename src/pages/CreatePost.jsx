import React, { useState, useContext, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import UserContext from '../context/userContext';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [error, setError] = useState('');

    const { currentUser } = useContext(UserContext);
    const token = currentUser?.token;
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image',
    ];

    const POST_CATEGORIES = [
        "Екзамени", "Спорт", "Досягнення", "Кримінал", "Діджиталізація", "Карантин",
        "Трагедії", "Зарахування"
    ];

    const createPost = async (e) => {
        e.preventDefault();

        const postData = new FormData();
        postData.append('title', title);
        postData.append('category', category);
        postData.append('description', description);
        postData.append('thumbnail', thumbnail);

        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/posts`, postData, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 201) {
                navigate('/');
            } else {
                setError('Failed to create post. Please try again.');
            }
        } catch (err) {
            console.error('Error:', err);
            const errorMessage = err.response?.data?.message || 'An error occurred';
            setError(errorMessage);
        }
    };

    return (
        <section className="create-post">
            <div className="container">
                <h2>Створення новини</h2>
                {error && <p className='error'>{error}</p>}
                <form className="form create-post_form" onSubmit={createPost}>
                    <input type="text" placeholder="Заголовок" value={title}
                           onChange={e => setTitle(e.target.value)} autoFocus required />
                    <select name='category' value={category}
                            onChange={e => setCategory(e.target.value)} required>
                        <option value="">Оберіть категорію</option>
                        {
                            POST_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)
                        }
                    </select>
                    <ReactQuill modules={modules} formats={formats} value={description} onChange={setDescription} required />
                    <input type='file' onChange={e => setThumbnail(e.target.files[0])}
                           accept='.png, .jpeg, .jpg' required />
                    <button type='submit' className='btn primary'>Створити</button>
                </form>
            </div>
        </section>
    );
}

export default CreatePost;
