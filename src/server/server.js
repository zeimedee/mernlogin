const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const PORT = 4000;
const routes = require('./routes');


app.use(cors());
app.use(bodyParser.json());
// connect db
mongoose.connect('mongodb://127.0.0.1:27017/register', {useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', () => {
    console.log('db connected established');
});

//passport middleware
app.use(passport.initialize());

//passport config
require('./validator/passport')(passport);



app.use('/register', routes);
app.listen(PORT, () => {
    console.log('server is running on port ', PORT);
});