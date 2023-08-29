const statisticsService = require('../services/statistics.service');




const getLastTenDaysSales = async (req, res) => {
    try {
        const sales = await statisticsService.getLastTenDaysSales();
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//get songs per genre
const getSongsPerGenre = async (req, res) => {
    try {
        const songs = await statisticsService.getSongsPerGenre();
        res.status(200).json(songs);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}



const getSalesPerMonths = async (req, res) => {
    try {
        const sales = await statisticsService.getSalesPerMonths();
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getSalesPerYears = async (req, res) => {
    try {
        const sales = await statisticsService.getSalesPerYears();
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getSalesPerGenre = async (req, res) => {
    try {
        const sales = await statisticsService.getSalesPerGenre();
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getSalesPerArtists = async (req, res) => {
    try {
        const sales = await statisticsService.getSalesPerArtists();
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getSalesPerAlbums = async (req, res) => {
    try {
        const sales = await statisticsService.getSalesPerAlbums();
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getSalesPerSongs = async (req, res) => {
    try {
        const sales = await statisticsService.getSalesPerSongs();
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getMostSoldSongs = async (req, res) => {
    try {
        const sales = await statisticsService.getMostSoldSongs();
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getMostSoldAlbums = async (req, res) => {
    try {
        const sales = await statisticsService.getMostSoldAlbums();
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getMostSoldArtists = async (req, res) => {
    try {
        const sales = await statisticsService.getMostSoldArtists();
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getMostSoldGenres = async (req, res) => {
    try {
        const sales = await statisticsService.getMostSoldGenres();
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getLastFiveSales = async (req, res) => {
    try {
        const sales = await statisticsService.getLastFiveSales();
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getTodaySales = async (req, res) => {
    try {
        const sales = await statisticsService.getTodaySales();
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}



module.exports = {
    getSalesPerMonths,
    getSalesPerYears,
    getSalesPerGenre,
    getSalesPerArtists,
    getSalesPerAlbums,
    getSalesPerSongs,
    getMostSoldSongs,
    getMostSoldAlbums,
    getMostSoldArtists,
    getMostSoldGenres,
    getLastFiveSales,
    getTodaySales,
    getSongsPerGenre,
    getLastTenDaysSales
}