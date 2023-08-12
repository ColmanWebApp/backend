const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');
const validations = require('../validations/index')
router
.get('/', userController.getAllUsers)
.get('/check-song/:id', validations.checkToken, userController.checkSong)
.get('/:id', userController.getUserById)
.get('/name/:name', userController.getUserByName)
.get('/email/:email', userController.getUserByEmail)
.post('/', userController.createUser)
.delete('/:id', validations.checkToken, userController.deleteUser)
.patch('/:id', validations.checkToken, userController.updateUser) 



module.exports = router;