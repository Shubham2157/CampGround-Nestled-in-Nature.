var express     = require('express');
var router      = express.Router();
var passport    = require('passport')
var User        = require('../models/user')


// Home Page Route
router.get("/", (req, res) => {
    res.render("landing")
})




//============
// Auth Route
//============

// show register form
router.get("/register", (req,res)=>{
    res.render("register");
})

//hendle sign Up logic
router.post("/register", (req,res)=>{
    // res.send("Signing up.....")
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
        if(err){
            console.log(err);
            return res.render("register")
        }
        passport.authenticate("local")(req,res, ()=> {
            res.redirect("/campgrounds")
        })
    })
})

// show login form

router.get("/login", (req,res)=>{
    res.render("login")
})

//handelling login post
// url , middleware , callback
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}) ,(req,res)=>{
    // res.send("longin sucess...")
})

//log out route

router.get("/logout", (req,res) => {
    req.logOut();
    res.redirect("/campgrounds")
})

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;