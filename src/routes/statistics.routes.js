const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/statistics.controller');

router
.get('/salesPerMonths', statisticsController.getSalesPerMonths)
.get('/salesPerYears', statisticsController.getSalesPerYears)
.get('/salesPerGenre', statisticsController.getSalesPerGenre)
.get('/salesPerArtists', statisticsController.getSalesPerArtists)
.get('/salesPerAlbums', statisticsController.getSalesPerAlbums)
.get('/salesPerSongs', statisticsController.getSalesPerSongs)
.get('/mostSoldSongs', statisticsController.getMostSoldSongs)
.get('/mostSoldAlbums', statisticsController.getMostSoldAlbums)
.get('/mostSoldArtists', statisticsController.getMostSoldArtists)
.get('/mostSoldGenres', statisticsController.getMostSoldGenres)
.get('/lastFiveSales', statisticsController.getLastFiveSales)
.get('/todaySales', statisticsController.getTodaySales)
.get('/songsPerGenre', statisticsController.getSongsPerGenre)

module.exports = router;