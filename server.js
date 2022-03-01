const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const { getCountNft } = require("./app/contract/event");

getCountNft();

const app = express();

app.use(cors());

app.use(bodyParser.json({ limit: '25mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

const mongodb = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

mongoose.connect(mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const mongooseClient = mongoose.connection;
mongooseClient.on("error", console.error.bind(console, "connection error: "));
mongooseClient.once("open", function () {
    console.log("Connected successfully!");
});

app.set('mongooseClient', mongooseClient);

require("./app/routes")(app);

const PORT = process.env.SERVER_PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
