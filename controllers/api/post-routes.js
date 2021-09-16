const router = require('express').Router();
const {
  User,
  Post,
  Comment

} = require('../../models');

router.get('/', (req, res) => {
    Post.findAll({
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
                attributes: ['id',  'post_id', 'user_id', 'createdAt'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(postData => res.json(postData.reverse()))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


router.get('/', (req, res) => {
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
                attributes: ['id',  'post_id', 'user_id', 'createdAt'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(postData => res.json(postData.reverse()))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// router.post('/', (req, res) => {
//     Post.create({
//             title: req.body.title,
//             content: req.body.content,
//             user_id: req.session.user_id
//         })
//         .then(postData => res.json(postData))
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });


module.exports = router;