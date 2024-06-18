import { useState } from 'react';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Uncategorized');
    const [description, setDescription] = useState('');
    const [thumbnail, setThumbnail] = useState('');

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }, {'indent': '-1'}, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    }

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image',
    ]

    const POST_CATEGORIES = ["Екзамени", "Спорт", "Досягнення", "Кримінал", "Діджиталізація", "Карантин",
        "Трагедії", "Вступ до ліцею"]

    const handleSubmit = (e) => {
        e.preventDefault();
        // Додати логіку для обробки даних форми
    }

    return (
        <section className="create-post">
            <div className="container">
                <h2>Створення новини</h2>
                <p className="form_error-message">
                    Повідомлення про помилку
                </p>
                <form className="form create-post_form" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Заголовок" value={title}
                           onChange={e => setTitle(e.target.value)} autoFocus/>
                    <select name='category' value={category}
                            onChange={e => setCategory(e.target.value)}>
                        {
                            POST_CATEGORIES.map(cat => <option key={cat}>{cat}</option>)
                        }
                    </select>
                    <ReactQuill modules={modules} formats={formats} value={description} onChange={setDescription}/>
                    <input type='file' onChange={e => setThumbnail(e.target.files[0])}
                           accept='.png, .jpeg, .jpg'/>
                    <button type='submit' className='btn primary'>Створити</button>
                </form>
            </div>
        </section>
    );
}

export default CreatePost;
