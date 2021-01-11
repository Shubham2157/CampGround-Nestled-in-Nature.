const express       = require('express'),
      app           = express(),
      bodyParser    = require('body-parser'),
      mongoose      = require("mongoose"),
      passport      = require('passport'),
      LocalStrategy = require('passport-local'),
      User          = require('./models/user'),
      Campground    = require('./models/campground'),
      Comment       = require("./models/comment"),
      seedDB        = require("./seeds")


var commentRoutes   = require("./routes/comments"),
    campgroundRoutes= require("./routes/campgrounds"),
    indexRoutes     = require("./routes/index")


// connecting to the db with mongoose
mongoose.connect("mongodb://localhost/yelp_camp" , { useNewUrlParser: true },  { useUnifiedTopology: true } )


// Campground.create({
//     name: "Shubham Jha",
//     image: "https://pixabay.com/get/52e8d4444255ae14f1dc84609620367d1c3ed9e04e507748752e7ed1974bc2_340.jpg",
//     description: "This is a huge granite hill, no bathrooms. No water. Beautiful granite!"
// }, (err, campground) => {
//     if(err){
//         console.log(err)
//     }else{
//         console.log("NEWLY CREATED CAMPGROUND: ")
//         console.log(campground)
//     }
// })

app.use(bodyParser.urlencoded({ extended: true }));
// setting view engine to ejs
app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"))

seedDB()

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

app.use(function(req,res,next) {
    res.locals.currentUser = req.user;
    next()
})

app.use("/" ,indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);




// declaring Port no
const port = 3000;

// listing to the port
app.listen(process.env.PORT || port, () => {
    console.log(`Serving to port ${port}`);
})