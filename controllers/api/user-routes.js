const router = require('express').Router();
const {
  User,
  Post,
  Comment

} = require('../../models');

router.get('/', (req, res) => {
    User.findAll({
            attributes: { exclude: ['password'] }
        })
        .then(userDB => res.json(userDB))
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
                res.status(400).json({ message: 'Username does not exist' });
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

                res.json({ user: userDB, message: 'Log in Succesfull' });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});



module.exports = router;