const router = require('express').Router();
// const thoughtRoutes = require('./thought-routes');
// const reactionRoutes = require('./reaction-routes');
const userRoutes = require('./user-routes');
const commentRoutes = require('./comment-routes');

// router.use('/thoughts', thoughtRoutes);
// router.use('/reactions', reactionRoutes);
router.use('/user', userRoutes);
router.use('/comment', commentRoutes);

module.exports = router;
