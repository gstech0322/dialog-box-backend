const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema({
    collectionId: {
        type: String,
        require: true
    },
    title: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    tokenAddress: {
        type: String,
    },
    marketplaceAddress: {
        type: String,
    }
});

module.exports = mongoose.model("collections", collectionSchema);