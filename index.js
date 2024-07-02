const express = require('express');
const mongoose = require('mongoose');
const bookroutes = require('./routes/Bookroutes');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const app = express();

app.use(express.json());

// mongodb connection
let dburl = process.env.DB_URL;

mongoose.connect(dburl).then((db) => {
    console.log("Database connected")
}).catch((err) => {
    console.log(err);
})

app.use("/books", bookroutes);

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

