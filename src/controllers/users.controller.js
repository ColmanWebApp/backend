const userService = require('../services/users.service');
const session = require('express-session');


const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getUserByName = async (req, res) => {
    try {
        const user = await userService.getUserByName(req.params.name);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getUserByEmail = async (req, res) => {
    try {
        const user = await userService.getUserByEmail(req.params.email);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await userService.deleteUser(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateUser = async (req, res) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const login = async (req, res) => {
    try {
        const user = await userService.login(req.body);
        req.session.user = user;
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const logout = async (req, res) => {
    try {
        req.session.destroy();
        res.status(200).json({message: 'User logged out'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getUserSongs = async (req, res) => {
    try {
        const user = await userService.getUserSongs(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const addSongToUser = async (req, res) => {
    try {
        const user = await userService.addSongToUser(req.params.id, req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const removeSongFromUser = async (req, res) => {
    try {
        const user = await userService.removeSongFromUser(req.params.id, req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


module.exports = {
    getAllUsers,
    getUserById,
    getUserByName,
    getUserByEmail,
    createUser,
    deleteUser,
    updateUser,
    login,
    logout,
    getUserSongs,
    addSongToUser,
    removeSongFromUser
}


