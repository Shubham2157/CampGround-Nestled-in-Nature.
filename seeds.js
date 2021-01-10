const mongoose = require("mongoose")
const Campground = require("./models/campground")
const Comment = require("./models/comment")

var data = [
    {
        name: "Shubham Jha",
        image: "https://pixabay.com/get/52e8d4444255ae14f1dc84609620367d1c3ed9e04e507748752e7ed1974bc2_340.jpg",
        description: "Blah Blah Blahajhk jhksd"
    },
    {
        name: "Preet Anurag",
        image: "https://pixabay.com/get/50e9d4474856b10ff3d8992ccf2934771438dbf852577049742a7ed4914a_340.jpg",
        description: "Blah Blah Blahajhk jhksd"
    },
    // { name: "Shubham Jha", image: "https://pixabay.com/get/52e8d4444255ae14f1dc84609620367d1c3ed9e04e507748752e7ed1974bc2_340.jpg" },
    // { name: "Preet Anurag", image: "https://pixabay.com/get/50e9d4474856b10ff3d8992ccf2934771438dbf852577049742a7ed4914a_340.jpg" },
    // { name: "Shubham Jha", image: "https://pixabay.com/get/52e8d4444255ae14f1dc84609620367d1c3ed9e04e507748752e7ed1974bc2_340.jpg" },
    // { name: "Preet Anurag", image: "https://pixabay.com/get/50e9d4474856b10ff3d8992ccf2934771438dbf852577049742a7ed4914a_340.jpg" },
    // { name: "Shubham Jha", image: "https://pixabay.com/get/52e8d4444255ae14f1dc84609620367d1c3ed9e04e507748752e7ed1974bc2_340.jpg" },
    // { name: "Preet Anurag", image: "https://pixabay.com/get/50e9d4474856b10ff3d8992ccf2934771438dbf852577049742a7ed4914a_340.jpg" },
    // { name: "Vinayak Agnihotri", image: "https://pixabay.com/get/55e8dc404f5aab14f1dc84609620367d1c3ed9e04e507748752e7ed1974bc2_340.jpg" },
    // { name: "Vinayak Agnihotri", image: "https://pixabay.com/get/55e8dc404f5aab14f1dc84609620367d1c3ed9e04e507748752e7ed1974bc2_340.jpg" },
    {
        name: "Vinayak Agnihotri",
        image: "https://pixabay.com/get/55e8dc404f5aab14f1dc84609620367d1c3ed9e04e507748752e7ed1974bc2_340.jpg",
        description: "Blah Blah Blahajhk jhksd"
    }
]

function seedDB() {
    // Remove all campgrounds
    Campground.remove({}, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("remove campground!");
            // add new campgrounds 
            data.forEach((seed) => {
                Campground.create(seed, (err, data) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Added a campground");
                        Comment.create({
                            text: "This is great place blah blah",
                            author: "Preet Anurag"
                        }, (err, comment)=>{
                            if(err){
                                console.log(err);
                            } else{
                                Campground.Comment.push(comment)
                                Campground.save()
                                console.log("Created new comment");
                            }
                        })
                    }
                })
            })
        }
    })
}

module.exports = seedDB
