var express = require('express');
var router = express.Router();
var Campground = require("../models/campground")

// Index - show all campgrounds
router.get("/", (req, res) => {
    //Get all Campgrounds From DB
    Campground.find({}, (err,allCampgrounds) =>{
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/index", { campgrounds: allCampgrounds, currentUser: req.user })
        }
    })
})

router.post("/", (req, res) => {
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

router.get("/new", (req, res) => {
    res.render("campgrounds/new")
})

//show all info in one page about one campground
router.get("/:id", (req,res) =>{
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


module.exports = router;