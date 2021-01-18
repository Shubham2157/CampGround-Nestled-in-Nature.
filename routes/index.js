var express = require('express');
var router = express.Router();
var passport = require('passport')
var User = require('../models/user')


// Home Page Route
router.get("/", (req, res) => {
    res.render("landing")
})

// show register form
router.get("/register", (req, res) => {
    res.render("register");
})

//hendle sign Up logic
router.post("/register", (req, res) => {
    // res.send("Signing up.....")
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            //console.log(err);
            req.flash("error", err.message)
            return res.render("register")
        }
        passport.authenticate("local")(req, res, () => {
            req.flash("success", "Welcome to YelpCamp " + user.username)
            res.redirect("/campgrounds")
        })
    })
})

// show login form

router.get("/login", (req, res) => {
    res.render("login")
})

//handelling login post
// url , middleware , callback
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), (req, res) => {
    // res.send("longin sucess...")
    req.flash("success", "Welcome back " + res.username)
})

//log out route

router.get("/logout", (req, res) => {
    req.logOut();
    req.flash("success", "Logged you out!")
    res.redirect("/campgrounds")
})

module.exports = router;