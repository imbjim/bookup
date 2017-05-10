//jshint esversion: 6

var express = require('express');
var router = express.Router();

const auth = require('../helpers/auth');
const User = require('../models/user');
const Book = require('../models/book');


//Get Add Book

var multer  = require('multer'); //added by Imre
var upload = multer({ dest: 'public/uploads' });


router.get('/add-book', auth.isAuthenticated, (req, res, next) => { //added by eduard
  res.render('addbook');
});

// Post Add Book

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

//Get Edit Book



//becareful with this part from here----------------
  Book.findById(req.params.id, (err, book) => {
    if (err) { next(err) }

router.get('/editbook/:id', auth.isAuthenticated, (req, res, next) => { //added by Imre
  let user = req.user;
  let bookId= req.params.id;
  Book.findById({_id: bookId}, (err, book)=>{
    if (err) throw err;

      res.render('editbook', { user: user, book : book});
    
    //to here-------------------


  });

});

//becareful with this part, from here --------------

//Post Edit Book

router.post('/:id', auth.isAuthenticated, (req, res, next) => { //added by eduard


//to here------------------

router.post('/editbook', upload.single('cover'), (req, res, next) => {// added by Imre
  var bookId = req.body.id;
  var file;
  if(req.file !== undefined){
    file = req.file.filename;
  } else {
    file = req.body.bookPicture.split("/")[1];
  }
  const bookInfo = {
    title: req.body.title,
    author: req.body.author,
    cover: req.body.picture,
    description: req.body.description,
    genre: req.body.genre,
    pages: req.body.pages,
    picture: 'uploads/' + file
  };
  
  //becareful with this part from here ----------------

  console.log(bookInfo);
  Book.findByIdAndUpdate(req.params.id, bookInfo, (err, book)=>{

    if (err) {next(err)}


  Book.findByIdAndUpdate(bookId, bookInfo, (err, book)=>{

  //to here ----------------------------
  
    res.redirect('/');
  });
});


//Get All Books

router.get('/all-books', auth.isAuthenticated, (req, res, next) => { //added by eduard
  let user = req.user;
  Book.find({}, (err, book) => {
    if (err) {
      next(err);
    } else {
      res.render('allbooks', { book: book, user: user });
    }
  });
});

//Get Available Books

router.get('/available-books', auth.isAuthenticated, (req, res, next) => { //added by eduard
  let user = req.user;

  Book.find({}, (err, book) => {
    if (err) {
      next(err);
    } else {
      res.render('availablebooks', { user: user, book: book});
    }

  });


  });
});


module.exports = router;
