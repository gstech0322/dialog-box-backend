const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

app.use(bodyParser.json({ limit: '25mb' }))
app.use(bodyParser.urlencoded({ extended: true }));

const mongodb = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

mongoose.connect(mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const mongooseClient = mongoose.connection;
mongooseClient.on("error", console.error.bind(console, "connection error: "));
mongooseClient.once("open", function () {
    console.log("Connected successfully!");
});


require("./app/seed")(app);