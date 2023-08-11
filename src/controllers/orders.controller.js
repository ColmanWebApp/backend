const ordersService = require('../services/orders.service');
const songService = require('../services/songs.service');
const userService = require('../services/users.service');
const jwt = require('jsonwebtoken');
// const mongoose = require('mongoose');
// const {Types: {ObjectId}} = require('mongoose');
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
        const {order, token} = req.body;
        const decodedToken = jwt.decode(token);
        console.log(decodedToken)
        const user = await userService.getUserById(decodedToken.id);
        const mySongs = [];
        for(let i = 0; i < order.songs.length; i++){
            const song = await songService.getSongById(order.songs[i]);
            mySongs.push(song._id);
        }
        order.user = user._id;
        const newOrder = await ordersService.createOrder(order);
        console.log(newOrder);
        for(let i = 0; i < mySongs.length; i++){
            songService.increaseNumOfPurchases(mySongs[i]);
        }
        //await userService.addOrderToUser(user._id, newOrder._id);
        //await userService.addSongsToUser(user._id, mySongs);
        user.orders.push(newOrder._id);
        user.songs.push(...mySongs);
        userService.updateUser(user._id, user);
        res.status(200).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//not necessary....
const deleteOrder = async (req, res) => {
    try {
        const id = req.params.id;
        const order = await ordersService.deleteOrder(id);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//not necessary....
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