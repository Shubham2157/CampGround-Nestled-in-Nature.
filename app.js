const express       = require('express')
const app           = express()
const bodyParser    = require('body-parser')
const mongoose      = require("mongoose")
const Campground    = require('./models/campground')
const Comment       = require("./models/comment")
const seedDB        = require("./seeds")

// connecting to the db with mongoose
mongoose.connect("mongodb://localhost/yelp_camp" , { useNewUrlParser: true },  { useUnifiedTopology: true } )


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

seedDB()


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
            res.render("campgrounds/index", { campgrounds: allCampgrounds })
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
    res.render("campgrounds/new")
})

//show all info in one page about one campground
app.get("/campgrounds/:id", (req,res) =>{
    //find campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) =>{
        if(err){
            console.log(err);
        } else{
            console.log(foundCampground);
            
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground})
        }
    })

    // res.send("This Will Be the show page one day!")
})


//====================
// Comments Routes
//====================

app.get("/campgrounds/:id/comments/new", (req,res)=>{
    
    //find campground by id
    Campground.findById(req.params.id, (err, campground)=>{
        if(err){
            console.log(err);
        } else{
            // res.send("This will be comment form")
            res.render("comments/new", {campground: campground})
        }
    })
})

app.post("/campgrounds/:id/comments", (req,res)=>{
    //lookup campground using id
    Campground.findById(req.params.id, (err, campground)=>{
        if(err){
            console.log(err);
            res.redirect("/campground")
        } else{
            //create new comment
            Comment.create(req.body.comment, (err, comment)=>{
                if(err){
                    console.log(err)
                } else{
                     //connect new comment to campground
                    campground.comments.push(comment)
                    campground.save();
                    //redirect campground show page
                    res.redirect("/campgrounds/" + campground._id)
                }
            });
            // comment will be created
        }
    })
})


// declaring Port no
const port = 3000;

// listing to the port
app.listen(process.env.PORT || port, () => {
    console.log(`Serving to port ${port}`);
})