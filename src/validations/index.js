const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/users.controller');
const initializePassport = require('../config/passport-config');
const jwt = require('jsonwebtoken');


const checkToken = (req, res, next) => {
    const {token} = req.body;
    if (!token) {
        return res.status(401).json({message: "You must be logged in to access this resource"});
    }
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if (err) {
            return res.status(403).json({message: "Invalid token"});
        }
        
    });
    next();
}

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

const adminAuth = (req, res, next) =>{
    const token = req.body.token;
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
            return res.status(403).json({message: "Invalid token"});
        }
        if(decodedToken.isAdmin === false){
            return res.status(403).json({message: "You must be an admin to access this resource"});
        }
    });
    next();
}



module.exports = {
    checkToken,
    loginAuth,
    registerAuth,
    logoutAuth,
    adminAuth
}