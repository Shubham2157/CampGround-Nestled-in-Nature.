const mongoose = require('mongoose')

// Schema Setup
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
})

var Campground = mongoose.model("Campground", campgroundSchema)

module.exports = Campground