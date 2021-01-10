const mongoose = require("mongoose")
const Campground = require("./models/campground")

function seedDB(){
    Campground.remove({}, (err) => {
        if(err){
            console.log(err);
        } else{
            console.log("remove campground!");
        }
    })
}

module.exports = seedDB
