const mongoose = require("mongoose");

// Define the MongoDB connection URL
const mongooseURL = "mongodb://localhost:27017/hotel";// Replace "mydatabase" with your data base name

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