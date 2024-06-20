const HttpError = require("../models/errorModel")
const jwt = require('jsonwebtoken')
const User = require("../models/userModel")
const bcrypt = require('bcryptjs')
const fs = require('fs')
const path = require('path')
const {v4: uuid} = require('uuid')
const registerUser = async (req, res, next) => {
    try{
        const {name, email, password, password2} = req.body
        if(!name || !email || !password){
            return next(new HttpError("Заповніть всі поля!", 422))
        }
        const newEmail = email.toLowerCase()
        const emailExists = await User.findOne({email: newEmail})
        if(emailExists){
            return next(new HttpError("Даний Email вже існує", 422))
        }
        if((password.trim()).length < 6){
            return next(new HttpError("Пароль має складатися мінімум з шести символів", 422))
        }
        if(password != password2){
            return next(new HttpError("Паролі не співпадають", 422))
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password, salt)
        const newUser = await User.create({name, email: newEmail, password: hashedPass})
        res.status(201).json(`Новий користувач ${newUser} зареєструвався`)
    }catch (error){
        return next(new HttpError("Реєстрація користувача невдалася", 422))
    }
}

const loginUser = async (req, res, next) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return next(new HttpError("Заповніть усі поля", 422))
        }
        const newEmail = email.toLowerCase()

        const user = await User.findOne({email: newEmail})
        if(!user){
            return next(new HttpError("Неправильно введені дані", 422))
        }

        const comparePass = await bcrypt.compare(password, user.password)
        if(!comparePass){
            return next(new HttpError("Неправильно введені дані", 422))
        }

        const {_id: id, name} = user;
        const token = jwt.sign({id, name}, process.env.JWT_SECRET, {expiresIn: "1d"})

        res.status(200).json({token, id, name})
    }catch (error){
        return next(new HttpError("Автентифікація не вдалася. Перевірте правильність введених даних", 422))
    }
}

const getUser = async (req, res, next) => {
    try{
        const {id} = req.params;
        const user = await User.findById(id).select('-password')
        if(!user){
            return next(new HttpError("Користувача не зайдено", 404))
        }
        res.status(200).json(user)
    }catch (error){
        return next(new HttpError(error))
    }
}

const changeAvatar = async (req, res, next) => {
    try {
        if (!req.files || !req.files.avatar) {
            return next(new HttpError("Please choose an image.", 422));
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            return next(new HttpError("User not found.", 404));
        }

        if (user.avatar) {
            fs.unlink(path.join(__dirname, '..', 'uploads', user.avatar), (err) => {
                if (err) {
                    return next(new HttpError(err.message, 500));
                }
            });
        }

        const avatar = req.files.avatar;
        if (avatar.size > 500000) {
            return next(new HttpError("Завелике зображення. Треба не більше, ніж 500 кб", 422));
        }

        const newFilename = `${uuid()}_${avatar.name}`;
        const uploadPath = path.join(__dirname, '..', 'uploads', newFilename);

        avatar.mv(uploadPath, async (err) => {
            if (err) {
                return next(new HttpError(err.message, 500));
            }

            user.avatar = newFilename;
            await user.save();

            res.status(200).json(user);
        });
    } catch (error) {
        return next(new HttpError(error.message, 500));
    }
};


const editUser = async (req, res, next) => {
   try {
       const {name, email, currentPassword, newPassword, confirmNewPassword} = req.body
       if(!name || !email || !currentPassword || !newPassword){
            return next(new HttpError("Заповніть усі поля"), 422)
       }
       const user = await User.findById(req.user.id)
       if(!user){
           return next(new HttpError("Користувача не знайдено", 403))
       }

       const emailExist = await User.findOne({email})
       if(emailExist && (emailExist._id != req.user.id)){
           return next(new HttpError("Даний Email вже використовується", 422))
       }

       const validateUserPassword = await bcrypt.compare(currentPassword, user.password)
       if(!validateUserPassword){
           return next(new HttpError("Неправильний поточний пароль", 422))
       }

       if(newPassword !== confirmNewPassword){
           return next(new HttpError("Нові паролі не співпадають", 422))
       }

       const salt = await bcrypt.genSalt(10)
       const hash = await bcrypt.hash(newPassword, salt)

       const newInfo = await User.findByIdAndUpdate(req.user.id, {name, email, password: hash}, {new: true})
       res.status(200).json(newInfo)
   }catch (error){
       return next(new HttpError(error))
   }
}

const getAuthors = async (req, res, next) => {
    try {
        const authors = await User.find().select('-password');
        res.json(authors);
    } catch (error) {
        return next(new HttpError(error));
    }
}


module.exports = {registerUser, loginUser, getUser, changeAvatar, editUser, getAuthors}