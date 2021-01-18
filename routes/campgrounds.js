var express = require('express');
var router = express.Router();
var Campground = require("../models/campground")
var middleware = require("../middleware")

// Index - show all campgrounds
router.get("/", (req, res) => {
        //Get all Campgrounds From DB
        Campground.find({}, (err, allCampgrounds) => {
            if (err) {
                console.log(err);
            } else {
                res.render("campgrounds/index", { campgrounds: allCampgrounds, currentUser: req.user })
            }
        })
    })
    //post campground
router.post("/", middleware.isLoggedIn, (req, res) => {
        // get data from user and add to campground array
        var name = req.body.name
        var price = req.body.price
        var image = req.body.image
        var desc = req.body.description
        var author = {
            id: req.user._id,
            username: req.user.username
        }
        var newCampground = { name: name, price: price, image: image, description: desc, author: author }
            // console.log(req.user);
            // campgrounds.push(newCampground)

        Campground.create(newCampground, (err, newlyCreated) => {
            if (err) {
                console.log(err)
            } else {
                console.log(newlyCreated);
                // redirect back to campground page
                req.flash("success", "Campground created successfully")
                res.redirect("/campgrounds")
            }
        })
    })
    //show campground form
router.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render("campgrounds/new")
})

//show all info in one page about one campground
router.get("/:id", (req, res) => {
    //find campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if (err) {
            console.log(err);
        } else {
            console.log(foundCampground);

            //render show template with that campground
            res.render("campgrounds/show", { campground: foundCampground })
        }
    })

    // res.send("This Will Be the show page one day!")
})

//Edit campground route
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if (err) {
            req.flash("error", "internal error !!")
            redirect('back')
        } else {
            res.render("campgrounds/edit", { campground: foundCampground })
        }
    })
})

//update campground route

router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    //find And update
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        if (err) {
            res.redirect("/campgrounds")
        } else {
            req.flash("success", "Campground updated successfully")
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

//Destroy campground route
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    //find And delete
    Campground.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Campground deleted successfully")
            res.redirect("/campgrounds");
        }
    })
})


module.exports = router;