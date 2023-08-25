const locationService = require('../services/locations.service');


const getAllLocations = async (req, res) => {
    try {
        const locations = await locationService.getAllLocations();
        res.status(200).json(locations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getLocationById = async (req, res) => {
    try {
        const id = req.params.locationId;
        const location = await locationService.getLocationById(id);
        res.status(200).json(location);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createLocation = async (req, res) => {
    try {
        const location = req.body;
        const newLocation = await locationService.createLocation(location);
        res.status(201).json(newLocation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteLocation = async (req, res) => {
    try {
        const id = req.params.locationId;
        const location = await locationService.deleteLocation(id);
        res.status(200).json(location);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateLocation = async (req, res) => {
    try {
        const id = req.params.locationId;
        const updatedLocation = req.body;
        const newLocation = await locationService.updateLocation(id, updatedLocation);
        res.status(200).json(newLocation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllLocations,
    getLocationById,
    createLocation,
    deleteLocation,
    updateLocation
}