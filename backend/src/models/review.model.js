const mongoose = require("mongoose")

const reviewSchema = new mongoose.Schema({
    user: {
        type: String, 
        require: true,
    }, 
    rating: {
        type: Number, 
        require: true,
    }, 
    text: {
        type: String, 
        requrie: true
    },
});

module.exports = mongoose.model("Review", reviewSchema);