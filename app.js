const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require("mongoose"),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    flash = require('connect-flash'),
    methodOverride = require('method-override'),
    User = require('./models/user'),
    Campground = require('./models/campground'),
    Comment = require("./models/comment"),
    seedDB = require("./seeds")

// requiring routes
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index")


// connecting to the db with mongoose
mongoose.connect("mongodb://localhost/yelp_camp_vFinal", { useNewUrlParser: true }, { useUnifiedTopology: true })

app.use(bodyParser.urlencoded({ extended: true }));
// setting view engine to ejs
app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"))
app.use(methodOverride("_method"));
app.use(flash());

//seedDB() // seed th database

//passport configuration

app.use(require("express-session")({
    secret: "Khai ke paan banaras wala",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error")
    res.locals.success = req.flash("success")
    next()
})

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);



// declaring Port no
const port = 3000;
// listing to the port
app.listen(process.env.PORT || port, () => {
    console.log(`Serving to port ${port}`);
})