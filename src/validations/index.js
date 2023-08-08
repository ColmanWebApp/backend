const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/users.controller');
const validations = require('../validations/index')
const initializePassport = require('../config/passport-config');





const loginAuth = (req, res, next) =>{
    passport.authenticate("local")
    next();
}

const registerAuth = (req, res, next) =>{
    const {name, email, password} = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: "Please fill all the fields" });
    }
    //regex for email
    if(!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
        return res.status(400).json({ error: "Please enter a valid email" });
    }

    if(password.length < 8){
        return res.status(400).json({ error: "Password must be at least 8 characters" });
    }
    next();
}

const logoutAuth = (req, res, next) =>{
    
}


module.exports = {
    loginAuth,
    registerAuth,
    logoutAuth
}