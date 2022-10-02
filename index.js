// express is a web application / framework
// nodemon used to change to the file while not need to restart it again
const express = require('express');
const routes = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// set up express app
const app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise = global.Promise;

app.use(express.static('public'));

/* middle ware */

// if we do not add the parser, we do not know what the request is
app.use(bodyParser.json());

// use all api
// route will be localhost:4000/api/ninjas
app.use('/api', routes);

// if meet error, can jump from api to here
// error handling middleware
app.use(function(err, req, res, next) {
    // console.log(err);
    res.status(422).send({error: err.message});
});


// listen for requests
app.listen(4000, function() {
    console.log('now listening for requests');
});