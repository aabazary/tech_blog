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
        'content',
        'createdAt'
      ],
      include: [{
                    model: Comment,
                    attributes: ['id', 'post_id', 'user_id'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        
    });

    const posts = postData.map((project) => project.get({
      plain: true
    }));
    console.log(posts)
    res.render('homepage', { posts, loggedIn: req.session.loggedIn })
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findOne({
      attributes: [
        'id',
        'title',
        'content',
        'createdAt'
      ],
      include: [{
                    model: Comment,
                    attributes: ['id', 'post_id', 'user_id'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        
    });

    const posts = postData.map((project) => project.get({
      plain: true
    }));
    console.log(posts)
    res.render('post-info', { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});


module.exports = router;