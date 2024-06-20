import React from 'react';
import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor';

const PostItem = ({ postID, category, title, description, authorID, thumbnail, createdAt }) => {
    const postTitle = title.length > 30 ? title.substring(0, 30) + "..." : title;

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + " ...";
    };

    const stripHtmlTags = (html) => {
        return html.replace(/<[^>]*>?/gm, '');
    };

    const truncatedDescription = truncateText(stripHtmlTags(description), 150);

    return (
        <article className="post">
            <div className="post_thumbnail">
                <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${thumbnail}`} alt={title} />
            </div>

            <div className="post_content">
                <Link to={`/posts/${postID}`}>
                    <h3>{postTitle}</h3>
                </Link>

                {}
                <p>{truncatedDescription}</p>

                <div className="post_footer">
                    <PostAuthor authorID={authorID} createdAt={createdAt}/>

                    <Link to={`/posts/categories/${category}`} className="btn category">
                        {category}
                    </Link>
                </div>
            </div>
        </article>
    );
};

export default PostItem;
