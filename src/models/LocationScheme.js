const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    longtitude: {
        type: Number,
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    }

});

module.exports = mongoose.model('location', LocationSchema, 'locations')