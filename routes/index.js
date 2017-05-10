//jshint esversion: 6


var express = require('express');
var router = express.Router();

const auth = require('../helpers/auth');
const User = require('../models/user');
const Book = require('../models/book');

var multer  = require('multer'); //added by Imre
var upload = multer({ dest: 'public/uploads' });

/* GET home page. */


router.get('/', auth.isAuthenticated, (req, res, next) => {
  let user = req.user;
    Book.find({}, (err, books) => {
      if (err) {
        next(err);
      } else {
        // console.log(user._id.equals(books[0].current_user)); //preguntar el perqué no funciona index.ejs if statement
        res.render('index', { user: user, books: books});
      }
    });
});

router.get('/edit-profile', auth.isAuthenticated, (req, res, next) => {
  let user = req.user;
  // console.log(req.user)
  res.render('editprofile', { user: user});

});



router.post('/edit', auth.isAuthenticated, upload.single('profile_image'), (req, res, next) => {
  const userInfo = {
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
    city: req.body.city,
    country: req.body.country,
    age: req.body.age,
    gender: req.body.gender,
    picture: 'uploads/' + req.file.filename
  };
  User.findByIdAndUpdate(req.user._id, userInfo, (err, user)=>{
    res.redirect('/');
  });
});


//----------------------
router.get('/:id/deletebook', (req, res, next) => {
  const id = req.params.id;
  Book.deleteOne({ _id: id }, (err) => {
    if (err) { next(err); }
    res.redirect('/');
  });
});

// router.get('/private', auth.isAuthenticated, (req, res, next) => {
//   res.send('private')
// })

module.exports = router;
