const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orders.controller');
const validations = require('../validations/index')

router
.get('/', orderController.getAllOrders)
.get('/:id', orderController.getOrderById)
.get('/user/:user', orderController.getOrdersByUser)
.post('/', validations.checkToken, orderController.createOrder)
.delete('/:id', validations.checkToken, validations.adminAuth, orderController.deleteOrder)
.patch('/:id', validations.checkToken, validations.adminAuth, orderController.updateOrder)

module.exports = router;