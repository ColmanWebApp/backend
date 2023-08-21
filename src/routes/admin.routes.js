const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orders.controller');
const userController = require('../controllers/users.controller');
const songController = require('../controllers/songs.controller');
const validations = require('../validations/index')

router
.put('/users/:userId', validations.checkToken, validations.adminAuth, userController.updateUser)
.delete('/users/:userId', validations.checkToken, validations.adminAuth, userController.deleteUser)
.post('/songs', validations.checkToken, validations.adminAuth, songController.createSong)
.put('/songs/:songId', validations.checkToken, validations.adminAuth, songController.updateSong)
.delete('/songs/:songId', validations.checkToken, validations.adminAuth, songController.deleteSong)
.put('/orders/:orderId', validations.checkToken, validations.adminAuth, orderController.updateOrder)
.delete('/orders/:orderId', validations.checkToken, validations.adminAuth, orderController.deleteOrder)


module.exports = router;