const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orders.controller');
const userController = require('../controllers/users.controller');
const songController = require('../controllers/songs.controller');
const validations = require('../validations/index')

router
.get('/users/',validations.checkToken, validations.adminAuth, userController.updateUser, userController.getAllUsers)
.put('/users/:userId', validations.checkToken, validations.adminAuth, userController.updateUser)
.delete('/users/:userId', validations.checkToken, validations.adminAuth, userController.deleteUser)
.get('/songs/', validations.checkToken, validations.adminAuth, songController.getAllSongs)
.post('/songs/', validations.checkToken, validations.adminAuth, songController.createSong)
.put('/songs/:songId', validations.checkToken, validations.adminAuth, songController.updateSong)
.delete('/songs/:songId', validations.checkToken, validations.adminAuth, songController.deleteSong)
.get('/orders/', validations.checkToken, validations.adminAuth, orderController.getAllOrders)
.put('/orders/:orderId', validations.checkToken, validations.adminAuth, orderController.updateOrder)
.delete('/orders/:orderId', validations.checkToken, validations.adminAuth, orderController.deleteOrder)


module.exports = router;