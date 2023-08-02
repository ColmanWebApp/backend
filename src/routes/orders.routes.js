const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orders.controller');

router
.get('/', orderController.getAllOrders)
.get('/:id', orderController.getOrderById)
.get('/user/:user', orderController.getOrdersByUser)
.post('/', orderController.createOrder)
.delete('/:id', orderController.deleteOrder)
.patch('/:id', orderController.updateOrder)

module.exports = router;