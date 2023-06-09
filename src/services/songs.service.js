const SongScheme = require('../models/SongScheme');

const getAllSongs = async () => {
    return await SongScheme.find();
}

const createSong = async (song) => {
    //create song and return it

    const { title, artist, album, year, genre, duration } = song;
    if (!title || !artist || !album || !year || !genre || !duration) {
        throw new Error('All fields are required');
    }
    
    const checkSong = await SongScheme.findOne({ title});
    if (checkSong) {
       throw new Error('Song already exists');
    }
    else{
        console.log("created")
        const newSong = await new SongScheme(song);
        return await newSong.save();
    }
    

}

const deleteSong = async (id) => {
    //delete song by id
    //if the song doesn't exist, throw an error
    if (id) {
        try{
            const song = await SongScheme.findById(id);
            await SongScheme.findByIdAndDelete(id);
            return;

        } catch (error) {
            throw new Error('Song not found');
        }    
    }
    throw new Error('Id is required');
}

const updateSong = async (id, newSong) => {
    if(id){
        console.log("newSong:",newSong)
        const { title, artist, album, year, genre, duration } = newSong;
        if (!title || !artist || !album || !year || !genre || !duration) {
            throw new Error('All fields are required');
        }
        const checkSong = await SongScheme.findOne({ title});
        if (checkSong) {
              throw new Error('Song already exists');
        }
        await SongScheme.findOneAndUpdate({_id: id}, newSong);
        return;
    }
    throw new Error('Id is required');
}

module.exports = {
    getAllSongs,
    createSong,
    deleteSong,
    updateSong
}