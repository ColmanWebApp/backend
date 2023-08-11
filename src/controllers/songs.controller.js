const songService = require('../services/songs.service');
const curl = require('curl');


const getAllSongs = async (req, res) => {
    try {
        const songs = await songService.getAllSongs();
        console.log(songs)
        res.status(200).json(songs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getSongsByIds = async (req, res) => {
    try {
        const {ids} = req.body;
        const songs = await songService.getSongsByIds(ids);
        res.status(200).json(songs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getSongsByArtist = async (req, res) => {
    try {
        const {artist} = req.params;
        const songs = await songService.getSongsByArtist(artist);
        res.status(200).json(songs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getSongsByAlbum = async (req, res) => {
    try {
        const {album} = req.params;
        const songs = await songService.getSongsByAlbum(album);
        res.status(200).json(songs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getSongsByGenre = async (req, res) => {
    try {
        const {genre} = req.params;
        const songs = await songService.getSongsByGenre(genre);
        res.status(200).json(songs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getSongsByYear = async (req, res) => {
    try {
        const {year} = req.params;
        const songs = await songService.getSongsByYear(year);
        res.status(200).json(songs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getSongById = async (req, res) => {
    try {
        const {id} = req.params;
        const song = await songService.getSongById(id);
        res.status(200).json(song);
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
        const {id} = req.params;
        await songService.deleteSong(id);
        res.status(200).json({ message: 'Song deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateSong = async (req, res) => {
    try {
        const {id} = req.params;
        const newSong = req.body;
        await songService.updateSong(id, newSong);
        res.status(200).json({ message: 'Song updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
}

module.exports = {
    getAllSongs,
    getSongsByIds,
    createSong,
    deleteSong,
    updateSong,
    getSongById,
    getSongsByArtist,
    getSongsByAlbum,
    getSongsByGenre,
    getSongsByYear
}