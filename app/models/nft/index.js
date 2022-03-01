const mongoose = require("mongoose");

const nftSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    idForSale: {
        type: Number,
        required: true
    },
    collectionId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    royalty: {
        type: String,
    },
    price: {
        type: String,
        required: true
    },
    property: {
        type: String,
    },
    onSale: {
        type: Boolean,
        require: true
    },
    date: {
        type: Date
    }
});

module.exports = mongoose.model("nfts", nftSchema);