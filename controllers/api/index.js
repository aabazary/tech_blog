const router = require('express').Router();
const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes.js');
const editRoutes = require('./edit-routes.js');

router.use('/edit', editRoutes);
router.use('/post', postRoutes);
router.use('/users', userRoutes);
module.exports = router;