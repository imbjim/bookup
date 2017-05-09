/*jshint esversion: 6*/

var express = require('express');
var router = express.Router();
const passport = require('passport');

const bcrypt     = require("bcrypt");
const bcryptSalt = 10;

const User = require('../models/user');
const Book = require('../models/book');

/* GET users listing. */
router.get('/signup', function(req, res, next) {
  res.render('auth/signup');
});

router.post('/signup', (req, res, next) => {

  const name = req.body.name; //added
  const city = req.body.city; //added
  const username = req.body.username;
  const password = req.body.password;

  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt     = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = User({
      username: username,
      password: hashPass,
      name: name, //added
      city: city //added
    });

    newUser.save((err) => {
      if (err) {
        res.render("auth/signup", { message: "Something went wrong" });
      } else {
        res.redirect("/");
      }
    });
  });
});


router.get('/login', (req, res, next) => {
  res.render('auth/login');
});

router.post('/login', passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: false,
  passReqToCallback: true
}));

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect("/login");
});


// router.get("/profile", function(req, res, next){//added by Imre
//   let user = req.user;
//   // console.log(req.user)
//   res.render('auth/profile', { user: user});
// });

// router.post('/profile', (req, res, next) => {// added by Imre
//   const userInfo = {
//     username: req.body.username,
//     email: req.body.email,
//     phone: req.body.phone,
//     city: req.body.city,
//     province: req.body.province,
//     country: req.body.country,
//     age: req.body.age,
//     gender: req.body.gender
//   };
//   User.findByIdAndUpdate(req.user._id, userInfo, (err, user)=>{
//     res.redirect('/profile');
//   });
// });

// router.get('/allbooks', (req, res, next) => {
//   Book.find({}, (err, book) => {
//     if (err) {
//       next(err);
//     } else {
//       console.log(book);
//       res.render('auth/allbooks', { book: book });
//     }
//   });
// });

//correct from here-----------------

/* GET new book */
// router.get('/addbook', (req, res, next) => {// added by Imre
//
//   Book.find({}, (err, book) => {
//     if (err) {
//       next(err);
//     } else {
//       console.log(book);
//       res.render('addbook', { book: book });
//     }
//   });
// });

//--------------end----------------------

//correct from here-----------------

// router.post('/allbooks', (req, res, next) => {// added by Imre
//   const bookInfo = {
//     title: req.body.title,
//     author: req.body.author,
//     cover: req.body.picture,
//     description: req.body.description,
//     genre: req.body.genre,
//     pages: req.body.pages,
//   };
//
//   const newBook = new Book(bookInfo);
//   newBook.save( (err) => {
//     if (err) {
//       next(err);
//     }
//     res.redirect('auth/allbooks');
//   });
// });

//--------------end----------------------

module.exports = router;
