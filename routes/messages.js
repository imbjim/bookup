//jshint esversion: 6

var express = require('express');
var router = express.Router();

const auth = require('../helpers/auth');
const User = require('../models/user');
const Book = require('../models/book');
const Message = require('../models/message');

var multer  = require('multer'); //added by Imre
var upload = multer({ dest: 'public/uploads' });

router.get('/messages', auth.isAuthenticated, (req, res, next) => { 
  let user = req.user;
  Message.find({}, (err, message) => {
    if (err) {
      next(err);
    } else {
      console.log(message);
      res.render('messages', { message: message, user: user });
    }
  });
});


module.exports = router;
