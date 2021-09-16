const router = require('express').Router();
const {
  User,
  Post,
  Comment

} = require('../models');
const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: [
        'id',
        'title',
        'content'
      ],

    });

    const posts = postData.map((project) => project.get({
      plain: true
    }));
    console.log(posts)
    res.render('homepage', {
      posts
    })
  } catch (err) {
    res.status(500).json(err);
  }
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