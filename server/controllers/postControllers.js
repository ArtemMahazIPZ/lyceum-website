const Post = require('../models/postModel')
const User = require('../models/userModel')
const path = require('path')
const fs = require('fs')
const {v4: uuid} = require('uuid')
const HttpError = require('../models/errorModel')

const createPost = async (req, res, next) => {
    try {
        const { title, category, description } = req.body;
        if (!title || !category || !description || !req.files) {
            return next(new HttpError("Заповніть всі поля та виберіть фото.", 422));
        }

        const { thumbnail } = req.files;

        if (thumbnail.size > 2000000) {
            return next(new HttpError("Фото занадто велике. Файл повинен бути менше 2 Мб."));
        }
        let fileName = thumbnail.name
        let splittedFilename = fileName.split('.')
        let newFilename = splittedFilename[0] + uuid() + "." + splittedFilename[splittedFilename - 1]
        thumbnail.mv(path.join(__dirname, '..', '/uploads', newFilename), async (err) => {
            if(err){
                return next(new HttpError(err))
            } else{
                const newPost = await Post.create({title, category, description, thumbnail: newFilename,
                    creator: req.user.id})
                if(!newPost){
                    return next(new HttpError("Пост не створено", 422))
                }

                const currentUser = await User.findById(req.user.id)
                const userPostCount = currentUser.posts + 1
                await User.findByIdAndUpdate(req.user.id, {posts: userPostCount})

                res.status(201).json(newPost)
            }
        })
    } catch (error) {
        return next(new HttpError(error));
    }
};


const getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find().sort({ updatedAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        return next(new HttpError(error));
    }
};



const getPost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) {
            return next(new HttpError("Не знайдено поста.", 404));
        }
        res.status(200).json(post);
    } catch (error) {
        return next(new HttpError(error));
    }
}


const getCatPosts = async (req, res, next) => {
    try {
        const { category } = req.params;
        const catPosts = await Post.find({ category }).sort({ createdAt: -1 });
        res.status(200).json(catPosts);
    } catch (error) {
        return next(new HttpError(error));
    }
}

const getUserPosts = async (req, res, next) => {
    try {
        const { id } = req.params;
        const posts = await Post.find({ creator: id }).sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        return next(new HttpError(error));
    }
};


const editPost = async (req, res, next) => {
    try {
        let fileName
        let newFilename
        let updatedPost
        const postId = req.params.id
        let {title, category, description} = req.body

        if(!title || !category || description.length < 12){
            return next(new HttpError("Заповніть усі поля", 422))
        }
        if (!req.files){
            updatedPost = await Post.findByIdAndUpdate(postId, {title, category, description}, {new: true})
        }else{
            const oldPost = await Post.findById(postId)
            fs.unlink(path.join(__dirname, '..', 'uploads', oldPost.thumbnail), async (err) =>{
                if(err){
                    return next(new HttpError(err))
                }
            })
            const {thumbnail} = req.files

            if(thumbnail.size > 2000000){
                return next(new HttpError("Фото завелике. Треба менше 2 мб"))
            }
            fileName = thumbnail.name
            let splittedFilename = fileName.split('.')
            newFilename = splittedFilename[0] + uuid() + splittedFilename[splittedFilename.length - 1]
            thumbnail.mv(path.join(__dirname, '..', 'uploads', newFilename), async (err) =>{
                if (err){
                    return next(new HttpError(err))
                }
            })
            updatedPost = await Post.findByIdAndUpdate(postId, {title, category, description, thumbnail: newFilename}, {new: true})
        }
        if(!updatedPost){
            return next(new HttpError("Неможливо оновити пост", 400))
        }
        res.status(200).json(updatedPost)
    } catch (error) {
        return next(new HttpError(error));
    }
};




const deletePost = async (req, res, next) => {
    try {
        const postId = req.params.id;

        if (!postId) {
            return next(new HttpError("Пост недоступний", 400));
        }

        const post = await Post.findById(postId);
        if (!post) {
            return next(new HttpError("Пост не знайдено", 404));
        }

        const fileName = post.thumbnail;

        if (req.user.id == post.creator) {
            fs.unlink(path.join(__dirname, '..', 'uploads', fileName), async (err) => {
                if (err) {
                    return next(new HttpError(err));
                } else {
                    await Post.findByIdAndDelete(postId);

                    const currentUser = await User.findById(req.user.id);
                    if (currentUser) {
                        const userPostCount = currentUser.posts - 1;
                        await User.findByIdAndUpdate(req.user.id, { posts: userPostCount });
                    }

                    res.json(`Пост ${postId} було успішно видалено!`);
                }
            });
        } else {
            return next(new HttpError("Пост не можна видалити", 403));
        }
    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};



module.exports = {createPost, getPosts, getPost, getCatPosts, getUserPosts, editPost, deletePost}