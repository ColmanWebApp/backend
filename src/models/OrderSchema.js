const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    songs: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'song',
        required: true

        },
    ],
    date: {
        type: Date,
        default: Date.now().addHours(3)
    }
});

module.exports = mongoose.model('order', OrderSchema, 'orders')