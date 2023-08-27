const songService = require('../services/songs.service');
const curl = require('curl');


const getAllSongs = async (req, res) => {
    try {
        const songs = await songService.getAllSongs();
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
        const id = req.params.songId;
        const song = await songService.getSongById(id);
        res.status(200).json(song);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const createSong = async (req, res) => {
    try {
        const {song} = req.body;
        const genres = [...song.genre];
        const duration = song.duration;
        //check with regex that the duration is in the format mm:ss and the seconds is maximum 59
        const reg = new RegExp('^(?:[0-5]\d):[0-5]\d$');
        if(!reg.test(duration)) return res.status(500).json({message: "Duration must be in the format mm:ss"});
        const price = song.price;
        //check with regex that the price doesnt contain letters (point is allowed)
        const reg2 = new RegExp('^[0-9]+(\.[0-9]+)?');
        if(!reg2.test(price)) return res.status(500).json({message: "Price must be a number"});
        if(updateSong.price < 0 ) return res.status(500).json({message: "Price cannot be negative"});
        const titleCaseGenres = genres.map(genre => {
            let myGenre = genre.split(' ');
            myGenre = myGenre.map(word => word[0].toUpperCase() + word.slice(1));
            myGenre = myGenre.join('-');
            console.log("myGenre after TitleCase with spaces",myGenre);
            myGenre = myGenre.split('-');
            myGenre = myGenre.map(word => word[0].toUpperCase() + word.slice(1));
            return myGenre.join('-');
        });
        song.genre = titleCaseGenres;
        const newSong = await songService.createSong(song);
        res.status(201).json(newSong);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const deleteSong = async (req, res) => {
    try {
        const id = req.params.songId;
        await songService.deleteSong(id);
        res.status(200).json({ message: 'Song deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateSong = async (req, res) => {
    try {
        const id = req.params.songId;
        const {updatedSong} = req.body;
        const duration = updatedSong.duration;
        //check if duration is in the format mm:ss and the seconds is maximum 59
        const reg = new RegExp('^(?:[0-5]\d):[0-5]\d$');
        if(!reg.test(duration)) return res.status(500).json({message: "Duration must be in the format mm:ss"});
        const price = updatedSong.price;
        //check if price contains letters
        const reg2 = new RegExp('^[0-9]+(\.[0-9]+)?');
        console.log(price)
        if(price < 0) return res.status(500).json({message: "Price cannot be negative"});
        if(!reg2.test(price)) return res.status(500).json({message: "Price must be a number"});
        await songService.updateSong(id, updatedSong);
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