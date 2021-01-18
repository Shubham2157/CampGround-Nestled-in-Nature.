var Campground  = require("../models/campground");
var Comment  = require("../models/comment");

// all the middle ware goes here
var middlewareOnj = {};

middlewareOnj.checkCampgroundOwnership = (req, res, next) => {
    //is user logged in
    if (req.isAuthenticated()) {

        Campground.findById(req.params.id, (err, foundCampground) => {
            if (err) {
                //console.log(err);
                req.flash("error", "Campground not found")
                res.redirect("back")
            } else {
                //does user own the campground
                // we cannot use if(foundCampground.author(mongoose object) === req.user._id(String))
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that")
                    res.redirect("back");
                }
            }
        })

    } else {
        req.flash("error", "You need to logged in to do that")
        res.redirect("back");
    }
    //if not then redirect
    //otgerwise,redirect

}

middlewareOnj.checkCommentOwnership = (req, res, next) => {
    //is user logged in
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if (err) {
                console.log(err);
                res.redirect("back")
            } else {
                //does user own the comment
                // we cannot use if(foundComment.author(mongoose object) === req.user._id(String))
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that")
                    res.redirect("back");
                }
            }
        })

    } else {
        req.flash("error", "You need to logged in to do that")
        res.redirect("back");
    }
    //if not then redirect
    //otgerwise,redirect

}

middlewareOnj.isLoggedIn = (req,res,next) =>{
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to login to do that") //shows flash message
    res.redirect("/login");
}



module.exports = middlewareOnj