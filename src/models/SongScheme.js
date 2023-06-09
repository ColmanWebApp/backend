const mongoose = require('mongoose');

const SongScheme = new mongoose.Schema({
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
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    duration: {
        type: Number,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 5
    },
    image: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 500
    },
    audio: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 500
    }
});

const Song = mongoose.model('song', SongScheme, 'songs')
module.exports = Song;