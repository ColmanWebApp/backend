const User = require('../models/user.model');
const Song = require('../models/song.model');

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

const getLastFiveSales = async () => {
    const sales = await User.aggregate([
        {$unwind: "$songs"},
        {$sort: {"songs.date": -1}},
        {$limit: 5}
    ]);
    return sales;
}

const getTodaySales = async () => {
    const sales = await User.aggregate([
        {$unwind: "$songs"},
        {$match: {"songs.date": {$gte: new Date(new Date().setHours(00, 00, 00)), $lte: new Date(new Date().setHours(23, 59, 59))}}},
        {$group: {
                _id: null,
                count: {$sum: 1}
            }}
    ]);
    return sales;
}

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


