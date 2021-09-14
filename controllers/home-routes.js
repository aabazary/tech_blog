const router = require('express').Router();
const {
  User,
  
} = require('../models');
// const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
  const userData = await User.findAll().catch((err) => { 
      res.json(err);
    });
      const users = userData.map((user) => user.get({ plain: true }));
      res.render('homepage', { users });
    });

module.exports = router;