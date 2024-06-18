import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar1 from '../lyceumimages/math.jpg';
import Avatar2 from '../lyceumimages/bulyga.jpg';
import Avatar3 from '../lyceumimages/graduate1.png';
import Avatar4 from '../lyceumimages/Henry.jpeg';
import Avatar5 from '../lyceumimages/Hlechyk.jpeg';

const authorsData = [
    { id: 1, avatar: Avatar1, name: 'Sara Trahtenberg', posts: 3 },
    { id: 2, avatar: Avatar2, name: 'Yurko Nepyjpyvo', posts: 5 },
    { id: 3, avatar: Avatar3, name: 'Max Revo', posts: 0 },
    { id: 4, avatar: Avatar4, name: 'Henry Tsyrkul', posts: 2 },
    { id: 5, avatar: Avatar5, name: 'Sonya Hnydenko', posts: 1 },
];

const Authors = () => {
    const [authors, setAuthors] = useState(authorsData);

    return (
        <section className="authors">
            {authors.length > 0 ? (
                <div className="container authors_container">
                    {authors.map(({ id, avatar, name, posts }) => {
                        return (
                            <Link key={id} to={`/posts/users/${id}`} className="author">
                                <div className="author_avatar">
                                    <img src={avatar} alt={`Image of ${name}`} />
                                </div>
                                <div className="author_info">
                                    <h4>{name}</h4>
                                    <p>{posts} posts</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            ) : (
                <h2 className='center'>No authors found</h2>
            )}
        </section>
    );
};

export default Authors;
