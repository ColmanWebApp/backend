const User = require('../models/user.model');
const Song = require('../models/song.model');

// maybe...
const getSalesPerMonths = async () => {
    const sales = await User.aggregate([
        {$unwind: "$songs"},
        {$group: {
                _id: {$month: "$songs.date"},
                count: {$sum: 1}
            }},
        {$sort: {_id: 1}}
    ]);
    return sales;
}

//not needed
const getSalesPerYear = async () => {
    const sales = await User.aggregate([
        {$unwind: "$songs"},
        {$group: {
                _id: {$year: "$songs.date"},
                count: {$sum: 1}
            }},
        {$sort: {_id: 1}}
    ]);
    return sales;
}
//get sales per day - havent used yet --> column chart width days for the last 10 days
const getSalesPerDay = async () => {
    const sales = await User.aggregate([
        {$unwind: "$songs"},
        {$group: {
                _id: {$dayOfMonth: "$songs.date"},
                count: {$sum: 1}
            }},
        {$sort: {_id: 1}}
    ]);
    return sales;
}


//not needed
const getSalesPerSong = async () => {
    const sales = await User.aggregate([
        {$unwind: "$songs"},
        {$group: {
                _id: "$songs.song",
                count: {$sum: 1}
            }},
        {$sort: {_id: 1}}
    ]);
    return sales;
}

//not needed
const getSalesPerArtist = async () => {
    const sales = await User.aggregate([
        {$unwind: "$songs"},
        {$lookup: {
                from: "songs",
                localField: "songs.song",
                foreignField: "_id",
                as: "song"
            }},
        {$unwind: "$song"},
        {$group: {
                _id: "$song.artist",
                count: {$sum: 1}
            }},
        {$sort: {_id: 1}}
    ]);
    return sales;
}

//not needed
const getSalesPerAlbum = async () => {
    const sales = await User.aggregate([
        {$unwind: "$songs"},
        {$lookup: {
                from: "songs",
                localField: "songs.song",
                foreignField: "_id",
                as: "song"
            }},
        {$unwind: "$song"},
        {$group: {
                _id: "$song.album",
                count: {$sum: 1}
            }},
        {$sort: {_id: 1}}
    ]);
    return sales;
}

//Pie Chart
const getSalesPerGenre = async () => {
    const sales = await User.aggregate([
        {$unwind: "$songs"},
        {$lookup: {
                from: "songs",
                localField: "songs.song",
                foreignField: "_id",
                as: "song"
            }},
        {$unwind: "$song"},
        {$unwind: "$song.genre"},
        {$group: {
                _id: "$song.genre",
                count: {$sum: 1}
            }},
        {$sort: {_id: 1}}
    ]);
    return sales;
}

//not needed
const getSalesPerUser = async () => {
    const sales = await User.aggregate([
        {$unwind: "$songs"},
        {$group: {
                _id: "$name",
                count: {$sum: 1}
            }},
        {$sort: {_id: 1}}
    ]);
    return sales;
}

//not needed
const getSalesPerUserPerMonth = async () => {
    const sales = await User.aggregate([
        {$unwind: "$songs"},
        {$group: {
                _id: {name: "$name", month: {$month: "$songs.date"}},
                count: {$sum: 1}
            }},
        {$sort: {_id: 1}}
    ]);
    return sales;
}

//not needed
const getSalesPerUserPerYear = async () => {
    const sales = await User.aggregate([
        {$unwind: "$songs"},
        {$group: {
                 _id: {name: "$name", year: {$year: "$songs.date"}},
                count: {$sum: 1}
            }},
        {$sort: {_id: 1}}
    ]);
    return sales;
}

//not needed
const getSalesPerUserPerSong = async () => {
    const sales = await User.aggregate([
        {$unwind: "$songs"},
        {$group: {
                _id: {name: "$name", song: "$songs.song"},
                count: {$sum: 1}
            }},
        {$sort: {_id: 1}}
    ]);
    return sales;
}

//not needed
const getSalesPerUserPerArtist = async () => {
    const sales = await User.aggregate([
        {$unwind: "$songs"},
        {$lookup: {
                from: "songs",
                localField: "songs.song",
                foreignField: "_id",
                as: "song"
            }},
        {$unwind: "$song"},
        {$group: {
                _id: {name: "$name", artist: "$song.artist"},
                count: {$sum: 1}
            }},
        {$sort: {_id: 1}}
    ]);
    return sales;
}

//not needed
const getSalesPerUserPerAlbum = async () => {
    const sales = await User.aggregate([
        {$unwind: "$songs"},
        {$lookup: {
                from: "songs",
                localField: "songs.song",
                foreignField: "_id",
                as: "song"
            }},
        {$unwind: "$song"},
        {$group: {
                _id: {name: "$name", album: "$song.album"},
                count: {$sum: 1}
            }},
        {$sort: {_id: 1}}
    ]);
    return sales;
}

//not needed
const getSalesPerUserPerGenre = async () => {
    const sales = await User.aggregate([
        {$unwind: "$songs"},
        {$lookup: {
                from: "songs",
                localField: "songs.song",
                foreignField: "_id",
                as: "song"
            }},
        {$unwind: "$song"},
        {$unwind: "$song.genre"},
        {$group: {
                _id: {name: "$name", genre: "$song.genre"},
                count: {$sum: 1}
            }},
        {$sort: {_id: 1}}
    ]);
    return sales;
}

//maybe for the admin
const getLastFiveSales = async () => {
    const sales = await User.aggregate([
        {$unwind: "$songs"},
        {$sort: {"songs.date": -1}},
        {$limit: 5}
    ]);
    return sales;
}

//not needed
const getTodaySales = async () => {
    const sales = await User.aggregate([
        {$unwind: "$songs"},
        {$match: {"songs.date": {$gte: new Date(new Date().setHours(0o0, 0o0, 0o0)), $lte: new Date(new Date().setHours(23, 59, 59))}}},
        {$group: {
                _id: null,
                count: {$sum: 1}
            }}
    ]);
    return sales;
}

//not needed
const getMostSoldAlbums = async () => {
    const sales = await User.aggregate([
        {$unwind: "$songs"},
        {$lookup: {
                from: "songs",
                localField: "songs.song",
                foreignField: "_id",
                as: "song"
            }},
        {$unwind: "$song"},
        {$group: {
                _id: "$song.album",
                count: {$sum: 1}
            }},
        {$sort: {count: -1}},
        {$limit: 5}
    ]);
    return sales;
}

//not needed
const getMostSoldSongs = async () => {
    const sales = await User.aggregate([
        {$unwind: "$songs"},
        {$group: {
                _id: "$songs.song",
                count: {$sum: 1}
            }},
        {$sort: {count: -1}},
        {$limit: 5}
    ]);
    return sales;
}

//not needed
const getMostSoldArtists = async () => {
    const sales = await User.aggregate([
        {$unwind: "$songs"},
        {$lookup: {
                from: "songs",
                localField: "songs.song",
                foreignField: "_id",
                as: "song"
            }},
        {$unwind: "$song"},
        {$group: {
                _id: "$song.artist",
                count: {$sum: 1}
            }},
        {$sort: {count: -1}},
        {$limit: 5}
    ]);
    return sales;
}

//not needed
const getMostSoldGenres = async () => {
    const sales = await User.aggregate([
        {$unwind: "$songs"},
        {$lookup: {
                from: "songs",
                localField: "songs.song",
                foreignField: "_id",
                as: "song"
            }},
        {$unwind: "$song"},
        {$unwind: "$song.genre"},
        {$group: {
                _id: "$song.genre",
                count: {$sum: 1}
            }},
        {$sort: {count: -1}},
        {$limit: 5}
    ]);
    return sales;
}

module.exports = {
    getSalesPerMonths,
    getSalesPerYear,
    getSalesPerSong,
    getSalesPerArtist,
    getSalesPerAlbum,
    getSalesPerGenre,
    getSalesPerUser,
    getSalesPerUserPerMonth,
    getSalesPerUserPerYear,
    getSalesPerUserPerSong,
    getSalesPerUserPerArtist,
    getSalesPerUserPerAlbum,
    getSalesPerUserPerGenre,
    getLastFiveSales,
    getTodaySales,
    getMostSoldAlbums,
    getMostSoldSongs,
    getMostSoldArtists,
    getMostSoldGenres
}


