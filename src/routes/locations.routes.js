const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locations.controller');
const validations = require('../validations/index')

router
    .get('/', locationController.getAllLocations)
    .get('/:locationId', locationController.getLocationById)
    .post('/', locationController.createLocation) //admin
    .delete('/:locationId', locationController.deleteLocation) //admin
    .put('/:locationId', locationController.updateLocation) //admin


module.exports = router;


