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

router.get('/edit-profile', auth.isAuthenticated, (req, res, next) => {
  let user = req.user;
  // console.log(req.user)
  res.render('editprofile', { user: user});

});

router.post('/', auth.isAuthenticated, (req, res, next) => { //added by eduard
  const userInfo = {
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
    city: req.body.city,
    country: req.body.country,
    age: req.body.age,
    gender: req.body.gender
  };
  User.findByIdAndUpdate(req.user._id, userInfo, (err, user)=>{
    res.redirect('/');
  });
});

//----------------------


// router.get('/private', auth.isAuthenticated, (req, res, next) => {
//   res.send('private')
// })

module.exports = router;
