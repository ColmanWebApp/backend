const express = require('express');
const router = express.Router();
const songController = require('../controllers/songs.controller');


router
.get('/', songController.getAllSongs)
.post('/', songController.createSong)
.delete('/:id', songController.deleteSong)
.patch('/:id', songController.updateSong)
    

module.exports = router;