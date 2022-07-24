const router = require('express').Router();
const {
	addComment,
	removeComment,
	addReply,
	removeReply,
} = require('../../controllers/comment-controller');

router.route('/:userId').post(addComment);

router.route('/:userId/:commentId').delete(removeComment);

router.route('/:userId/:commentId').put(addReply).delete(removeComment);

router.route('/:userId/:commentId/:replyId').delete(removeReply);

module.exports = router;
