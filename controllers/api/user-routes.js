const router = require('express').Router();
const {
    User,
    Post,
    Comment

} = require('../../models');

router.get('/', (req, res) => {
    User.findAll({
            attributes: {
                exclude: ['password']
            }
        })
        .then(userDB => res.json(userDB))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    User.findOne({
            attributes: {
                exclude: ['password']
            },
            where: {
                id: req.params.id
            },
            include: [{
                    model: Post,
                    attributes: [
                        'id',
                        'title',
                        'content',
                        'created_at'
                    ]
                },

                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'created_at'],
                    include: {
                        model: Post,
                        attributes: ['title']
                    }
                },
                {
                    model: Post,
                    attributes: ['title'],
                }
            ]
        })
        .then(userDB => {
            if (!userDB) {
                res.status(404).json({
                    message: 'Username does not exist'
                });
                return;
            }
            res.json(userDB);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.post('/login', (req, res) => {
    User.findOne({
            where: {
                username: req.body.username
            }
        }).then(userDB => {
            if (!userDB) {
                res.status(400).json({
                    message: 'Username does not exist'
                });
                return;
            }
            // const verifyPass = userDB.checkPassword(req.body.password);
            // console.log(verifyPass)
            // if (!verifyPass) {
            //     res.status(400).json({ message: 'Incorrect password' });
            //     return;
            // }
            req.session.save(() => {

                req.session.user_id = userDB.id;
                req.session.username = userDB.username;
                req.session.loggedIn = true;

                res.json({
                    user: userDB,
                    message: 'Log in Succesfull'
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});


router.post('/', (req, res) => {

    User.create({
            username: req.body.username,
            password: req.body.password
        })

        .then(userDB => {
            req.session.save(() => {
                req.session.user_id = userDB.id;
                req.session.username = userDB.username;
                req.session.loggedIn = true;

                res.json(userDB);
                console.log(userDB)
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


module.exports = router;