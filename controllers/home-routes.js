const router = require('express').Router();
const {
  User,

} = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
 
    res.render('homepage')
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});


module.exports = router;