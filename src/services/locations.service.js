const Location = require('../models/LocationScheme');

const getAllLocations = async () => {
    try {
        const locations = await Location.find();
        return locations;
    } catch (error) {
        throw new Error(error.message);
    }
}

const getLocationById = async (id) => {
    try {
        const location = await Location.findById(id);
        if (!location) throw new Error('Location not found');
        return location;
    } catch (error) {
        throw new Error(error.message);
    }
}

const createLocation = async (location) => {
    try {
        const newLocation = new Location(location);
        await newLocation.save();
        return newLocation;
    } catch (error) {
        throw new Error(error.message);
    }
}

const deleteLocation = async (id) => {
    try {
        const location = await Location.findByIdAndDelete(id);
        return location;
    } catch (error) {
        throw new Error(error.message);
    }
}

const updateLocation = async (id, updatedLocation) => {
    try {
        const location = await Location.findByIdAndUpdate(id, updatedLocation);
        return location;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    getAllLocations,
    getLocationById,
    createLocation,
    deleteLocation,
    updateLocation
}





