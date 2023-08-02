const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');

router
.get('/', userController.getAllUsers)
.get('/:id', userController.getUserById)
.get('/name/:name', userController.getUserByName)
.get('/email/:email', userController.getUserByEmail)
.post('/', userController.createUser)
.delete('/:id', userController.deleteUser)
.patch('/:id', userController.updateUser) 



module.exports = router;