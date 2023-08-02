const ordersService = require('../services/orders.service');

const getAllOrders = async (req, res) => {
    try {
        const orders = await ordersService.getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getOrdersByUser = async (req, res) => {
    try {
        const user = req.params.user;
        const orders = await ordersService.getOrdersByUser(user);
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getOrderById = async (req, res) => {
    try {
        const id = req.params.id;
        const order = await ordersService.getOrderById(id);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createOrder = async (req, res) => {
    try {
        const order = req.body;
        const newOrder = await ordersService.createOrder(order);
        res.status(200).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteOrder = async (req, res) => {
    try {
        const id = req.params.id;
        const order = await ordersService.deleteOrder(id);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateOrder = async (req, res) => {
    try {
        const id = req.params.id;
        const order = req.body;
        const updatedOrder = await ordersService.updateOrder(id, order);
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllOrders,
    getOrdersByUser,
    getOrderById,
    createOrder,
    deleteOrder,
    updateOrder
}