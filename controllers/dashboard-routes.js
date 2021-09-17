const router = require('express').Router();
const {
    User,
    Post,
    Comment

} = require('../models');
// const withAuth = require('../utils/auth');


router.get('/', async (req, res) => {
    Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: [
                'id',
                'title',
                'content',
                'createdAt'
            ],
            include: [{
                    model: Comment,
                    attributes: ['id', 'post_id', 'user_id', ],
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
        })
        .then(postData => {
            const posts = postData.map(post => post.get({
                plain: true
            }));
            res.render('dashboard', {
                posts,
                loggedIn: true
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/edit/:id', (req, res) => {
    Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id',
                'title',
                'content',
                'createdAt'
            ],
            include: [{
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: ['id', 'post_id', 'user_id', 'createdAt'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        })
        .then(postData => {
            if (!postData) {
                res.status(404).json({
                    message: 'No post found'
                });
                return;
            }

            const post = postData.get({
                plain: true
            });
            res.render('edit-post', {
                post,
                loggedIn: true
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})



module.exports = router;