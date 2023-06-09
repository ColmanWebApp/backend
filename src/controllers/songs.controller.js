const songService = require('../services/songs.service');



const getAllSongs = async (req, res) => {
    try {
        const songs = await songService.getAllSongs();
        res.status(200).json(songs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createSong = async (req, res) => {
    try {
        const song = req.body;
        console.log(song)
        const newSong = await songService.createSong(song);
        res.status(201).json(newSong);
    } catch (error) {
        res.status(409).json({ status: 409, error: error.message });
    }
}

const deleteSong = async (req, res) => {
    try {
        const id = req.params.id;
        await songService.deleteSong(id);
        res.status(200).json({ message: 'Song deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateSong = async (req, res) => {
    try {
        const id = req.params.id;
        const newSong = req.body;
        await songService.updateSong(id, newSong);
        res.status(200).json({ message: 'Song updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllSongs,
    createSong,
    deleteSong,
    updateSong
}