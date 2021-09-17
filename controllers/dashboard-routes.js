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
        .then(postDB => {
            const posts = postDB.map(post => post.get({
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

// router.get('/add', (req, res) => {
//     res.render('dashboard');
// });

module.exports = router;