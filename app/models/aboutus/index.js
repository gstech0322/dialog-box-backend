const mongoose = require("mongoose");

const aboutusSchema = new mongoose.Schema({
    // title: {
    //     type: String,
    //     required: true
    // },
    content: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("aboutus", aboutusSchema);