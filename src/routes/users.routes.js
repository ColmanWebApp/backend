const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');
const validations = require('../validations/index')
router
.get('/', userController.getAllUsers)
.get('/:id', userController.getUserById)
.get('/name/:name', userController.getUserByName)
.get('/email/:email', userController.getUserByEmail)
.post('/check-song/:id', validations.checkToken, userController.checkSong)
.post('/user-details', validations.checkToken, userController.getUserDetails)
.post('/', userController.createUser)
.delete('/:id', validations.checkToken, userController.deleteUser)
.put('/', validations.checkToken, validations.updatedUserAuth, userController.updateUser) 



module.exports = router;