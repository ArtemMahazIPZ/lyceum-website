import { useContext, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import UserContext from '../context/userContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditPost = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Uncategorized');
    const [description, setDescription] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [error, setError] = useState('');

    const { currentUser } = useContext(UserContext);
    const token = currentUser?.token;
    const navigate = useNavigate();
    const { id } = useParams();

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

    const POST_CATEGORIES = ["Екзамени", "Спорт", "Досягнення", "Кримінал", "Діджиталізація", "Карантин",
        "Трагедії", "Зарахування"];

    useEffect(() => {
        const getPost = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`);
                setTitle(response.data.title);
                setDescription(response.data.description);
                setCategory(response.data.category); // Якщо хочете завантажити категорію
            } catch (error) {
                console.log(error);
            }
        };
        getPost();
    }, [id]);

    const editPost = async (e) => {
        e.preventDefault();
        const postData = new FormData();
        postData.set('title', title);
        postData.set('category', category);
        postData.set('description', description);
        postData.set('thumbnail', thumbnail);

        try {
            const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/posts/${id}`, postData, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.status === 200) {
                navigate('/');
            }
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    return (
        <section className="create-post">
            <div className="container">
                <h2>Редагування новини</h2>
                {error && <p className="form_error-message">
                    {error}
                </p>}
                <form className="form create-post_form" onSubmit={editPost}>
                    <input type="text" placeholder="Заголовок" value={title}
                           onChange={e => setTitle(e.target.value)} autoFocus />
                    <select name='category' value={category}
                            onChange={e => setCategory(e.target.value)}>
                        {
                            POST_CATEGORIES.map(cat => <option key={cat}>{cat}</option>)
                        }
                    </select>
                    <ReactQuill modules={modules} formats={formats} value={description} onChange={setDescription} />
                    <input type='file' onChange={e => setThumbnail(e.target.files[0])}
                           accept='.png, .jpeg, .jpg' />
                    <button type='submit' className='btn primary'>Відредагувати</button>
                </form>
            </div>
        </section>
    );
};

export default EditPost;
