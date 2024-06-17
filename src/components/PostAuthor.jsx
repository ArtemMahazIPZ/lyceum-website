import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from '../lyceumimages/Henry.jpeg';

const PostAuthor = ({ authorId, date }) => {
    return (
        <Link to={`/posts/users/sdfsdf}`}>
            <div className="post_author-avatar">
                <img src={Avatar} alt="" />
            </div>

            <div className="post_author-details">
                <h5>By: Super Maga</h5>
                <small>Just Now</small>
            </div>
        </Link>
    );
};

export default PostAuthor;
