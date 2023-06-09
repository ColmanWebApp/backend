if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const connectDB = require('./config/mongo');
const PORT = process.env.PORT || 5000;

const app = express();
//middleWares
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//routes
app.use('/songs', require('./routes/songs.routes'));





app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});



