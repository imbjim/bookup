//jshint esveersion: 6

var express = require('express');
var router = express.Router();

const auth = require('../helpers/auth')
const User = require('../models/user');
const Book = require('../models/book');

router.get('/add-book', auth.isAuthenticated, (req, res, next) => { //added by eduard
  // Book.find({}, (err, book) => {
  //   if (err) {
  //     next(err);
  //   } else {
  //     // console.log(book);
  //     res.render('addbook', { book: book });
  //   }
  // });
  res.render('addbook');
});

router.post('/newBook',  auth.isAuthenticated, (req, res, next) => {// added by Imre
  console.log("entrando al post")
  const bookInfo = {
    title: req.body.title,
    author: req.body.author,
    cover: req.body.picture,
    description: req.body.description,
    genre: req.body.genre,
    pages: req.body.pages,
  };

  const newBook = new Book(bookInfo);
  console.log("despues de newBook", newBook);
  newBook.save( (err) => {
    if (err) {
      next(err);
    }
    res.redirect('/');
  });
});


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


module.exports = router;
