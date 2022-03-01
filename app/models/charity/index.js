const mongoose = require("mongoose");

const charitySchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("charities", charitySchema);