const mongoose = require('mongoose');

const env = require('./environment')
//incase of localhost we can write as 127.0.0.1 ...ipp adress of updated nopde  
mongoose.connect('mongodb://127.0.0.1/social_development');

const db = mongoose.connection;

//error
db.on('error', function(err) { console.log(err.message); });

//up and running then print the message
db.once('open', function() {
  
    console.log("Successfully connected to the database");

});

module.exports=db;