const mongoose = require('mongoose');

const SongScheme = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50,
        unique: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    artist: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    album: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    year: {
        type: Number,
        required: true,
        trim: true,
        minlength: 4,
        maxlength: 4
    },
    genre: {
        type: [String],
        trim: true,
        minlength: 3,
        maxlength: 50,
        default: []
    },
    duration: {
        type: Number,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 5
    },
    album_image: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 500,
        default: 'https://www.freeiconspng.com/uploads/no-image-icon-4.png'
    },
    purchase: {
        type: [{
            user: {ref: 'user', type: mongoose.Schema.Types.ObjectId},
             date: {type: Date, default: Date.now}
        }],
        default: []
    },
    price: {
        type: Number,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 5,
        default: 19.99,
    },
    preview_url: {
        type: String,
        trim: true,
        maxlength: 500,
        default: '',
    }
});

module.exports = mongoose.model('song', SongScheme, 'songs')