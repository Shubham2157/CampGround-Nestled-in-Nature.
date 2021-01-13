var express = require('express');
var router = express.Router();
var Campground = require("../models/campground")

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
router.post("/", isLoggedIn, (req, res) => {
    // get data from user and add to campground array
    var name = req.body.name
    var image = req.body.image
    var desc = req.body.description
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = { name: name, image: image, description: desc, author: author }
    // console.log(req.user);
    // campgrounds.push(newCampground)

    Campground.create(newCampground, (err, newlyCreated) => {
        if (err) {
            console.log(err)
        } else {
            console.log(newlyCreated);
            // redirect back to campground page
            res.redirect("/campgrounds")
        }
    })
})
//show campground form
router.get("/new", isLoggedIn, (req, res) => {
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
router.get("/:id/edit", checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        res.render("campgrounds/edit", { campground: foundCampground })
    })
})

//update campground route

router.put("/:id", (req, res) => {
    //find And update
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        if (err) {
            res.redirect("/campgrounds")
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

//Destroy campground route
router.delete("/:id", (req, res) => {
    //find And delete
    Campground.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    })
})

//middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

function checkCampgroundOwnership(req, res, next) {
    //is user logged in
    if (req.isAuthenticated()) {

        Campground.findById(req.params.id, (err, foundCampground) => {
            if (err) {
                console.log(err);
                res.redirect("back")
            } else {
                //does user own the campground
                // we cannot use if(foundCampground.author(mongoose object) === req.user._id(String))
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        })

    } else {
        res.redirect("back");
    }
    //if not then redirect
    //otgerwise,redirect

}


module.exports = router;