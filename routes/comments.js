var express     = require('express');
var router      = express.Router({mergeParams: true}); //merge parameter true for  finding th id from the home route
var Campground  = require("../models/campground");
var Comment     = require("../models/comment");

// comment form
router.get("/new", isLoggedIn ,(req,res)=>{
    
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

// handle comment post
router.post("/", isLoggedIn , (req,res)=>{
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
                    // add user name and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save the comment
                    comment.save();
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

// comment edit route
router.get("/:comment_id/edit", checkCommentOwnership ,(req,res) => {
    Comment.findById(req.params.comment_id, (err, foundComment)=>{
        if(err){
            res.render("back");
        } else{
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    })
})

// comment update
router.put("/:comment_id", (req, res)=>{
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) =>{
        if(err){
            res.redirect("back");
        }
        else{
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
})

/// comment destroy route
router.delete("/:comment_id", (req,res)=>{
    // res.send("deleted")
    //findById and remove
    Comment.findByIdAndRemove(req.params.comment_id, (err) =>{
        if(err){
            res.redirect("back");
        } else{
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
})

//middleware
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

function checkCommentOwnership(req, res, next) {
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