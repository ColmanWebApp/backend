if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const connectDB = require('./config/mongo');
const getToken = require('./config/spotifyApi');
const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash');



const PORT = process.env.PORT || 5000;



const app = express();
//middleWares
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use('/songs', require('./routes/songs.routes'));
app.use('/users', require('./routes/users.routes'));
app.use('/orders', require('./routes/orders.routes'));
app.use('/auth', require('./routes/auth.routes'));
app.use('/admin', require('./routes/admin.routes'));
app.use('/statistics', require('./routes/statistics.routes'));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});



