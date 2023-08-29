const User = require('../models/UserScheme');
const Song = require('../models/SongScheme');
const Order = require('../models/OrderSchema');


const getLastTenDaysSales = async () => {
    // Calculate the date ten days ago from today
    const today = new Date();
    const tenDaysAgo = today.setDate(today.getDate() - 10);
  
    // Aggregate sales data for the last ten consecutive days
    const sales = await Order.aggregate([
      {
        $match: {
          date: { $gte: tenDaysAgo } // Filter orders from the last ten days
        }
      },
      { $unwind: "$songs" },
      {
        $group: {
          _id: {
            $dateToString: { format: "%d-%m-%Y", date: "$date" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 } // Sort by date in ascending order
      }
    ]);
  
    return sales;
  };



  //group all the order.songs from orders by genre and count them
const getSalesPerGenre = async () => {
    const sales = await Order.aggregate([
        {
          $lookup: {
            from: 'songs', // Name of the songs collection
            localField: 'songs',
            foreignField: '_id',
            as: 'purchasedSongs',
          },
        },
        {
          $unwind: '$purchasedSongs',
        },
        {
          $unwind: '$purchasedSongs.genre', // Unwind the genres array
        },
        {
          $group: {
            _id: '$purchasedSongs.genre', // Group by individual genres
            count: { $sum: 1 }, // Count the occurrences of each genre
          },
        },
        {
          $project: {
            _id: 1,
            count: 1,
          },
        },
    ]);
    return sales;
}


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

const getSongsPerGenre = async () => {
    const songs = await Song.aggregate([
        {$unwind: "$genre"},
        {$group: {
                _id: "$genre",
                count: {$sum: 1}
            }},
        {$sort: {_id: 1}}
    ]);
    return songs;
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
    getMostSoldGenres,
    getSongsPerGenre,
    getLastTenDaysSales
}


