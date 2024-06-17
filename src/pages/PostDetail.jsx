import React from 'react';
import { Link } from 'react-router-dom';
import PostAuthor from '../components/PostAuthor';
import Thumbnail from '../lyceumimages/tolik.jpg'
const PostDetail = () => {
    return (
        <section className="post-detail">
            <div className="container post-detail_container">
                <div className="post-detail_header">
                    <PostAuthor/>
                    <div className="post-detail_buttons">
                        <Link to={`/posts/wenwe/edit`} className="btn sm primary">Edit</Link>
                        <Link to={`/posts/wenwe/delete`} className="btn sm danger">Delete</Link>
                    </div>
                </div>
                <h1>This is a post title!</h1>
                <div className="post-detail_thumbnail">
                    <img src={Thumbnail} alt=""/>
                </div>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Alias, animi aperiam aut corporis culpa debitis delectus
                    dicta dignissimos eligendi harum, impedit ipsum laborum mollitia
                    nostrum obcaecati, odio pariatur perspiciatis praesentium quidem rem
                    reprehenderit sequi tempore voluptates. Consequuntur nesciunt perspiciatis recusandae!
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa deserunt dolorem fuga
                    labore officia omnis pariatur, placeat ratione rem reprehenderit, tempore vitae voluptatibus!
                    Animi dolor dolores esse itaque magnam modi nobis pariatur quam quod reprehenderit!
                    Aliquid aperiam corporis debitis est fugit incidunt natus odit, pariatur quae quas quasi
                    tempora vel voluptatem! Hic libero sapiente vitae.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A consequatur ea,
                    incidunt molestias odio quod quos saepe voluptatem. Aperiam asperiores beatae
                    blanditiis cupiditate deserunt dicta distinctio dolores enim esse explicabo facilis
                    illum inventore nulla, odit perferendis porro qui quia repellendus, saepe sequi sit
                    vel veniam, voluptatibus. Adipisci alias aliquid architecto cum dignissimos dolorum
                    esse facilis impedit iure laboriosam maiores modi molestias neque nihil odio pariatur
                    possimus quas quasi quod rem, soluta sunt, ullam unde veritatis voluptate. A amet animi
                    asperiores consequuntur, debitis, deleniti deserunt dolores eaque eligendi error ex excepturi
                    facilis illo incidunt laboriosam laborum magnam molestiae mollitia nam non nostrum,
                    obcaecati optio quaerat quam quia sint soluta suscipit ullam unde.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    A autem corporis doloremque dolorum iste libero mollitia repudiandae
                    temporibus vero, voluptate.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, harum officia.
                    A accusantium adipisci asperiores beatae blanditiis corporis debitis dolore doloremque doloribus
                    ducimus eos eum excepturi illo impedit ipsam, iure iusto laudantium modi nihil non numquam pariatur
                    possimus quia quibusdam quidem quod quos rem saepe sapiente unde velit veritatis vitae voluptatem.
                    Aperiam corporis ducimus illo, incidunt magnam pariatur reiciendis vero voluptate. Accusantium asperiores
                    consequatur dicta fugiat harum inventore laborum natus quod quos reprehenderit. Commodi, dolores facere
                    obcaecati officia placeat sapiente sequi temporibus? Alias animi at commodi consectetur, enim explicabo
                    nventore labore recusandae similique voluptatum! Alias distinctio doloremque eum, laborum necessitatibus neque
                    nisi nostrum pariatur provident quaerat quasi quibusdam rem, voluptatibus. Autem cum dolor dolorem earum
                    laboriosam minima nostrum officia perferendis voluptas voluptatem. Ab cupiditate deleniti dignissimos doloribus,
                    dolorum eos et fugit ipsam itaque laborum maxime molestiae omnis possimus, quam quos ratione, reprehenderit sed vel
                    voluptas voluptatibus! Amet ea nisi placeat porro reiciendis. Accusantium consectetur cupiditate dolor dolore eum ex,
                    exercitationem explicabo facere fuga id illum laboriosam modi nihil odio omnis porro possimus? A assumenda dolore d
                    oloremque dolorum, facilis illum maxime molestiae molestias omnis possimus ratione rerum, totam veniam.
                    At commodi culpa deleniti deserunt eligendi eos facere fugiat magni necessitatibus obcaecati.
                </p>
            </div>
        </section>
    );
};

export default PostDetail;
