var express = require('express');
var router = express.Router();

const auth = require('../helpers/auth')

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('req.session: ', req.session )
  console.log('req.user: ', req.user )
  console.log('req.isAuthenticated: ', req.isAuthenticated() )
  res.render('index', { title: 'Express' });
});

router.get('/private', auth.isAuthenticated, (req, res, next) => {
  res.send('private')
})

module.exports = router;
