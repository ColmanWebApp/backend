const Order = require('../models/OrderSchema');

const getAllOrders = async () => {
    const orders = await Order.find();
    return orders;
}

const getOrdersByUser = async (user) => {
    const orders = await Order.find({ user: user });
    return orders;
}

const getOrderById = async (id) => {
    if(id){
        try{
            const order = await Order.findById(id);
            if(order)
            {
                return order;
            }
            else{
                throw new Error("Order not found");
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }
    else{
        throw new Error("Id is required");
    }
    
}

const createOrder = async (order) => {
    const newOrder = new Order(order);
    await newOrder.save();
    return newOrder;
}

const deleteOrder = async (id) => {
    if(id){
        try{
            const order = await Order.findByIdAndDelete(id);
            if(order)
            {
                return order;
            }
            else{
                throw new Error("Order not found");
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }
    else{
        throw new Error("Id is required");
    }
}

const updateOrder = async (id, order) => {
    if(id){
        try{
            const updatedOrder = await Order.findByIdAndUpdate(id, order);
            if(updatedOrder)
            {
                return updatedOrder;
            }
            else{
                throw new Error("Order not found");
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }
    else{
        throw new Error("Id is required");
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
