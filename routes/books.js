// /*jshint esversion: 6*/
//
// var express = require('express');
// var router = express.Router();
//
// /* GET new book */
// router.get('/addbook', (req, res, next) => {// added by Imre
//
//   Book.find({}, (err, book) => {
//     if (err) {
//       next(err);
//     } else {
//       console.log(book);
//       res.render('auth/addbook', { book: book });
//     }
//   });
// });
//
//
// router.post('auth/allbooks', (req, res, next) => {// added by Imre
//   const bookInfo = {
//     title: req.body.title,
//     author: req.body.author,
//     picture: req.body.picture,
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
//     res.redirect('/allbooks');
//   });
// });
