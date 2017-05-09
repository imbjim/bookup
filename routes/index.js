var express = require('express');
var router = express.Router();

const auth = require('../helpers/auth')
const User = require('../models/user');
const Book = require('../models/book');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   console.log('req.session: ', req.session )
//   console.log('req.user: ', req.user )
//   console.log('req.isAuthenticated: ', req.isAuthenticated() )
//   res.render('index', { title: 'Express' });
// });

router.get('/', auth.isAuthenticated, (req, res, next) => {
  let user = req.user;
  // console.log(req.user)
  res.render('index', { user: user});

});

router.get('/edit-profile', auth.isAuthenticated, (req, res, next) => { //added by eduard
  const userInfo = {
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
    city: req.body.city,
    province: req.body.province,
    country: req.body.country,
    age: req.body.age,
    gender: req.body.gender
  };
  User.findByIdAndUpdate(req.user._id, userInfo, (err, user)=>{
    res.redirect('index');
  });
});

//----------------------

router.get('/edit-book', auth.isAuthenticated, (req, res, next) => { //added by eduard
  let user = req.user;

  res.render('editbook', { user: user});
});

router.get('/all-books', auth.isAuthenticated, (req, res, next) => { //added by eduard
  Book.find({}, (err, book) => {
    if (err) {
      next(err);
    } else {
      // console.log(book);
      res.render('allbooks', { book: book });
    }
  });
});

router.get('/available-books', auth.isAuthenticated, (req, res, next) => { //added by eduard
  let user = req.user;
  res.render('availablebooks', { user: user});
});

router.get('/add-book', auth.isAuthenticated, (req, res, next) => { //added by eduard
  Book.find({}, (err, book) => {
    if (err) {
      next(err);
    } else {
      // console.log(book);
      res.render('addbook', { book: book });
    }
  });
});

router.post('/add-book', (req, res, next) => {// added by Imre
  const bookInfo = {
    title: req.body.title,
    author: req.body.author,
    cover: req.body.picture,
    description: req.body.description,
    genre: req.body.genre,
    pages: req.body.pages,
  };

  const newBook = new Book(bookInfo);
  newBook.save( (err) => {
    if (err) {
      next(err);
    }
    res.redirect('auth/allbooks');
  });
});


// router.get('/private', auth.isAuthenticated, (req, res, next) => {
//   res.send('private')
// })

module.exports = router;
