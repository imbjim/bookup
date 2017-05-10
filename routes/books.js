//jshint esversion: 6

var express = require('express');
var router = express.Router();

const auth = require('../helpers/auth')
const User = require('../models/user');
const Book = require('../models/book');


router.get('/add-book', auth.isAuthenticated, (req, res, next) => { //added by eduard
  res.render('addbook');
});

router.post('/newBook',  auth.isAuthenticated, (req, res, next) => {// added by Imre
  const bookInfo = {
    title: req.body.title,
    author: req.body.author,
    cover: req.body.picture,
    description: req.body.description,
    available: req.body.available,
    genre: req.body.genre,
    pages: req.body.pages,
    current_user: req.user._id, //preguntar dubtes de perquè no agafa les dades al model mitjançant ObjectId
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


router.get('/:id/edit', auth.isAuthenticated, (req, res, next) => { //added by eduard

  Book.findById(req.params.id, (err, book) => {
    if (err) { next(err) };

 console.log(book);

  res.render('editbook', { book: book});
   });
});
/////testing
router.post('/:id', auth.isAuthenticated, (req, res, next) => { //added by eduard

  const bookInfo = {
    title: req.body.title,
    author: req.body.author,
    pages: req.body.pages,
    description: req.body.pages,
    available: req.body.available,
    picture: req.body.picture,
  };
  console.log(bookInfo);
  Book.findByIdAndUpdate(req.params.id, bookInfo, (err, book)=>{
    // console.log(book, "this is book")
    if (err) {next(err)}
    res.redirect('/');
  });
});

// router.post('/:id', (req, res, next) => {
//   const productInfo = {
//     name: req.body.name,
//     price: req.body.price,
//     imageUrl: req.body.imageUrl,
//     description: req.body.description
//   }
//
//   Product.findByIdAndUpdate(req.params.id, productInfo ,(err, product) => {
//     if (err) { next(err) }
//     res.redirect('/products')
//   })
// })


///////
router.get('/all-books', auth.isAuthenticated, (req, res, next) => { //added by eduard
  let user = req.user;
  Book.find({}, (err, book) => {
    if (err) {
      next(err);
    } else {
      // console.log(book);
      res.render('allbooks', { book: book, user: user });
    }
  });
});

router.get('/available-books', auth.isAuthenticated, (req, res, next) => { //added by eduard
  let user = req.user;

  Book.find({}, (err, book) => {
    if (err) {
      next(err);
    } else {
      res.render('availablebooks', { user: user, book: book});
    }
  })

  // res.render('availablebooks', { user: user});
});


module.exports = router;
