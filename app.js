const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require("mongoose")

// connecting to the db with mongoose
mongoose.connect("mongodb://localhost/yelp_camp" , { useNewUrlParser: true },  { useUnifiedTopology: true } )

// Schema Setup
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
})

var Campground = mongoose.model("Campground", campgroundSchema)


// Campground.create({
//     name: "Shubham Jha",
//     image: "https://pixabay.com/get/52e8d4444255ae14f1dc84609620367d1c3ed9e04e507748752e7ed1974bc2_340.jpg",
//     description: "This is a huge granite hill, no bathrooms. No water. Beautiful granite!"
// }, (err, campground) => {
//     if(err){
//         console.log(err)
//     }else{
//         console.log("NEWLY CREATED CAMPGROUND: ")
//         console.log(campground)
//     }
// })

app.use(bodyParser.urlencoded({ extended: true }));
// setting view engine to ejs
app.set("view engine", "ejs")

// var campgrounds = [
//     { name: "Shubham Jha", image: "https://pixabay.com/get/52e8d4444255ae14f1dc84609620367d1c3ed9e04e507748752e7ed1974bc2_340.jpg" },
//     { name: "Preet Anurag", image: "https://pixabay.com/get/50e9d4474856b10ff3d8992ccf2934771438dbf852577049742a7ed4914a_340.jpg" },
//     { name: "Shubham Jha", image: "https://pixabay.com/get/52e8d4444255ae14f1dc84609620367d1c3ed9e04e507748752e7ed1974bc2_340.jpg" },
//     { name: "Preet Anurag", image: "https://pixabay.com/get/50e9d4474856b10ff3d8992ccf2934771438dbf852577049742a7ed4914a_340.jpg" },
//     { name: "Shubham Jha", image: "https://pixabay.com/get/52e8d4444255ae14f1dc84609620367d1c3ed9e04e507748752e7ed1974bc2_340.jpg" },
//     { name: "Preet Anurag", image: "https://pixabay.com/get/50e9d4474856b10ff3d8992ccf2934771438dbf852577049742a7ed4914a_340.jpg" },
//     { name: "Shubham Jha", image: "https://pixabay.com/get/52e8d4444255ae14f1dc84609620367d1c3ed9e04e507748752e7ed1974bc2_340.jpg" },
//     { name: "Preet Anurag", image: "https://pixabay.com/get/50e9d4474856b10ff3d8992ccf2934771438dbf852577049742a7ed4914a_340.jpg" },
//     { name: "Vinayak Agnihotri", image: "https://pixabay.com/get/55e8dc404f5aab14f1dc84609620367d1c3ed9e04e507748752e7ed1974bc2_340.jpg" },
//     { name: "Vinayak Agnihotri", image: "https://pixabay.com/get/55e8dc404f5aab14f1dc84609620367d1c3ed9e04e507748752e7ed1974bc2_340.jpg" },
//     { name: "Vinayak Agnihotri", image: "https://pixabay.com/get/55e8dc404f5aab14f1dc84609620367d1c3ed9e04e507748752e7ed1974bc2_340.jpg" }
// ]

// Home Page Route
app.get("/", (req, res) => {
    res.render("landing")
})

//
app.get("/campgrounds", (req, res) => {
    //Get all Campgrounds From DB
    Campground.find({}, (err,allCampgrounds) =>{
        if(err){
            console.log(err);
        } else{
            res.render("index", { campgrounds: allCampgrounds })
        }
    })
})

app.post("/campgrounds", (req, res) => {
    // get data from user and add to campground array
    var name = req.body.name
    var image = req.body.image
    var desc = req.body.description
    var newCampground = { name: name, image: image, description: desc }
    // campgrounds.push(newCampground)

    Campground.create(newCampground, (err, newlyCreated) => {
        if(err){
            console.log(err)
        } else{
            // redirect back to campground page
            res.redirect("/campgrounds")
        }
    }) 
})

app.get("/campgrounds/new", (req, res) => {
    res.render("new")
})

//show all info in one page about one campground
app.get("/campgrounds/:id", (req,res) =>{
    //find campground with provided ID
    Campground.findById(req.params.id, (err, foundCampground) =>{
        if(err){
            console.log(err);
        } else{
            //render show template with that campground
            res.render("show", {campground: foundCampground})
        }
    })

    // res.send("This Will Be the show page one day!")
})

// declaring Port no
const port = 3000;

// listing to the port
app.listen(process.env.PORT || port, () => {
    console.log(`Serving to port ${port}`);
})