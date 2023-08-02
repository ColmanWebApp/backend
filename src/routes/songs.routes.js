const express = require('express');
const router = express.Router();
const songController = require('../controllers/songs.controller');


router
.get('/', songController.getAllSongs)
.get('/:id', songController.getSongById)
.get('/artist/:artist', songController.getSongsByArtist)
.get('/album/:album', songController.getSongsByAlbum)
.get('/genre/:genre', songController.getSongsByGenre)
.get('/year/:year', songController.getSongsByYear)
.post('/', songController.createSong)
.delete('/:id', songController.deleteSong)
.patch('/:id', songController.updateSong)
    

module.exports = router;