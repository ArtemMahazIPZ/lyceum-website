import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import en from 'javascript-time-ago/locale/en.json';

TimeAgo.addDefaultLocale(en);

const PostAuthor = ({ authorID, createdAt }) => {
    const [author, setAuthor] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getAuthor = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${authorID}`);
                setAuthor(response.data);
            } catch (error) {
                setError(error);
            }
        };

        getAuthor();
    }, [authorID]);

    if (!author || error) {
        return null;
    }

    return (
        <Link to={`/posts/users/${authorID}`}>
            <div className="post_author-avatar">
                {author.avatar && <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${author.avatar}`} alt={author.name} />}
            </div>
            <div className="post_author-details">
                <h5>By: {author.name}</h5>
                <small>{createdAt && <ReactTimeAgo date={new Date(createdAt)} locale="en-US" />}</small>
            </div>
        </Link>
    );
};

export default PostAuthor;
