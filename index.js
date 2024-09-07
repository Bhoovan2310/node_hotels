const express = require("express");
const app = express();
const db = require("./db");
require('dotenv').config();  

const bodyParser = require("body-parser");
app.use(bodyParser.json());

// const port = 3000;
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("welcome to website");
});

const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes);


const menuItemRoutes = require('./routes/menuItemRoutes');
app.use('/menu', menuItemRoutes);



app.listen(port, () => {
  console.log("server is running at port : " + port);
});
