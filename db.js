const mongoose = require("mongoose");
require('dotenv').config();


// Define the MongoDB connection URL
// const mongooseURL = process.env.MONGODB_URL_LOCAL;// Replace "mydatabase" with your data base name
const mongooseURL = process.env.MONGODB_URL;

// stablish connection
mongoose.connect(mongooseURL, {
    // useNewUrlParser : true,
    // useUnifiedTopology : true
});

//get the default conneciton
// mongoese maintains a default connection object represneting the mongoDB connection
const db = mongoose.connection;


// some eventListener of mongoDB
db.on('connected', () => {
    console.log('Connected to MongoDB server')
})

db.on('error', (err) => {
    console.log('MongoDB connection error : ', err);
})
db.on('disconnected', () => {
    console.log('MongoDB disconnected');
})


module.exports = db;