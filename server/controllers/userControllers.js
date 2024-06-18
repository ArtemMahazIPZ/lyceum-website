const HttpError = require("../models/errorModel")
const User = require("../models/userModel")
const bcrypt = require('bcryptjs')
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
    res.json("Login user")
}

const getUser = async (req, res, next) => {
    res.json("User profile")
}

const changeAvatar = async (req, res, next) => {
    res.json("Change user avatar")
}

const editUser = async (req, res, next) => {
    res.json("Edit user details")
}

const getAuthors = async (req, res, next) => {
    res.json("Get all authors")
}

module.exports = {registerUser, loginUser, getUser, changeAvatar, editUser, getAuthors}