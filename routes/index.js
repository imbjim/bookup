var express = require('express');
var router = express.Router();

const auth = require('../helpers/auth')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   console.log('req.session: ', req.session )
//   console.log('req.user: ', req.user )
//   console.log('req.isAuthenticated: ', req.isAuthenticated() )
//   res.render('index', { title: 'Express' });
// });

router.get('/', auth.isAuthenticated, (req, res, next) => {
  res.render('index');
});

router.get('/profile', auth.isAuthenticated, (req, res, next) => { //added by eduard
  res.render('profile');
});

router.get('/edit-profile', auth.isAuthenticated, (req, res, next) => { //added by eduard
  res.render('editprofile');
});

router.get('/edit-book', auth.isAuthenticated, (req, res, next) => { //added by eduard
  res.render('editbook');
});

router.get('/all-books', auth.isAuthenticated, (req, res, next) => { //added by eduard
  res.render('allbooks');
});

router.get('/available-books', auth.isAuthenticated, (req, res, next) => { //added by eduard
  res.render('availablebooks');
});

// router.get('/private', auth.isAuthenticated, (req, res, next) => {
//   res.send('private')
// })

module.exports = router;
