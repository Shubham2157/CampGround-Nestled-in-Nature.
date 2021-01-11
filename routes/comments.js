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
//middleware
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;