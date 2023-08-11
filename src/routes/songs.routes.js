const express = require('express');
const router = express.Router();
const songController = require('../controllers/songs.controller');


router
.get('/', songController.getAllSongs)
.post('/', songController.getSongsByIds)
.get('/:id', songController.getSongById)
.get('/artist/:artist', songController.getSongsByArtist) //we can filter from the whole list of songs
.get('/album/:album', songController.getSongsByAlbum) // ^^
.get('/genre/:genre', songController.getSongsByGenre) // ^^
.get('/year/:year', songController.getSongsByYear) // ^^
.post('/', songController.createSong)
.delete('/:id', songController.deleteSong)
.patch('/:id', songController.updateSong)
    

module.exports = router;