var express = require('express');
var router = express.Router({ mergeParams: true }); //merge parameter true for  finding the id from the home route
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware")

// comment form
router.get("/new", middleware.isLoggedIn, (req, res) => {

    //find campground by id
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
        } else {
            // res.send("This will be comment form")
            res.render("comments/new", { campground: campground })
        }
    })
})

// handle comment post
router.post("/", middleware.isLoggedIn, (req, res) => {
    //lookup campground using id
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
            res.redirect("/campground")
        } else {
            //create new comment
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    req.flash("error", "Something went wrong")
                    console.log(err)
                } else {
                    // add user name and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save the comment
                    comment.save();
                    //connect new comment to campground
                    campground.comments.push(comment)
                    campground.save();
                    //redirect campground show page
                    req.flash("success", "Successfully added comment")
                    res.redirect("/campgrounds/" + campground._id)
                }
            });
            // comment will be created
        }
    })
})

// comment edit route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if (err) {
            res.render("back");
        } else {
            res.render("comments/edit", { campground_id: req.params.id, comment: foundComment });
        }
    })
})

// comment update
router.put("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
        if (err) {
            res.redirect("back");
        } else {
            req.flash("success", "comment updated successfully")
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
})

/// comment destroy route
router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    // res.send("deleted")
    //findById and remove
    Comment.findByIdAndRemove(req.params.comment_id, (err) => {
        if (err) {
            res.redirect("back");
        } else {
            req.flash("success", "comment deleted successfully")
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
})

//middleware

module.exports = router;