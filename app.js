const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }));
// setting view engine to ejs
app.set("view engine", "ejs")

var campgrounds = [
    { name: "Shubham Jha", image: "https://pixabay.com/get/52e8d4444255ae14f1dc84609620367d1c3ed9e04e507748752e7ed1974bc2_340.jpg" },
    { name: "Preet Anurag", image: "https://pixabay.com/get/50e9d4474856b10ff3d8992ccf2934771438dbf852577049742a7ed4914a_340.jpg" },
    { name: "Shubham Jha", image: "https://pixabay.com/get/52e8d4444255ae14f1dc84609620367d1c3ed9e04e507748752e7ed1974bc2_340.jpg" },
    { name: "Preet Anurag", image: "https://pixabay.com/get/50e9d4474856b10ff3d8992ccf2934771438dbf852577049742a7ed4914a_340.jpg" },
    { name: "Shubham Jha", image: "https://pixabay.com/get/52e8d4444255ae14f1dc84609620367d1c3ed9e04e507748752e7ed1974bc2_340.jpg" },
    { name: "Preet Anurag", image: "https://pixabay.com/get/50e9d4474856b10ff3d8992ccf2934771438dbf852577049742a7ed4914a_340.jpg" },
    { name: "Shubham Jha", image: "https://pixabay.com/get/52e8d4444255ae14f1dc84609620367d1c3ed9e04e507748752e7ed1974bc2_340.jpg" },
    { name: "Preet Anurag", image: "https://pixabay.com/get/50e9d4474856b10ff3d8992ccf2934771438dbf852577049742a7ed4914a_340.jpg" },
    { name: "Vinayak Agnihotri", image: "https://pixabay.com/get/55e8dc404f5aab14f1dc84609620367d1c3ed9e04e507748752e7ed1974bc2_340.jpg" },
    { name: "Vinayak Agnihotri", image: "https://pixabay.com/get/55e8dc404f5aab14f1dc84609620367d1c3ed9e04e507748752e7ed1974bc2_340.jpg" },
    { name: "Vinayak Agnihotri", image: "https://pixabay.com/get/55e8dc404f5aab14f1dc84609620367d1c3ed9e04e507748752e7ed1974bc2_340.jpg" }
]

// Home Page Route
app.get("/", (req, res) => {
    res.render("landing")
})

//
app.get("/campgrounds", (req, res) => {
    res.render("campgrounds", { campgrounds: campgrounds })
})

app.post("/campgrounds", (req, res) => {
    // get data from user and add to campground array
    var name = req.body.name
    var image = req.body.image
    var newCampground = { name: name, image: image }
    campgrounds.push(newCampground)
    // redirect back to campground page
    res.redirect("/campgrounds")
})

app.get("/campgrounds/new", (req, res) => {
    res.render("new")
})


// declaring Port no
const port = 3000;

// listing to the port
app.listen(process.env.PORT || port, () => {
    console.log(`Serving to port ${port}`);
})