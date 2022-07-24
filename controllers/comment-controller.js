const { response } = require('express');
const { Comment, User } = require('../models');

const commentController = {
	// add comment to user
	addComment({ params, body }, res) {
		console.log(body);
		Comment.create(body)
			.then(({ _id }) => {
				return User.findOneAndUpdate(
					{ _id: params.UserId },
					{ $push: { comments: _id } },
					{ new: true }
				);
			})
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: 'No user found with this id!' });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => res.json(err));
	},

	addReply({ params, body }, res) {
		Comment.findOneAndUpdate(
			{ _id: params.commentId },
			{ $push: { replies: body } },
			{ new: true, runValidators: true }
		)
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: 'No user found with this id!' });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => res.json(err));
	},

	// remove comment from user
	removeComment({ params }, res) {
		Comment.findOneAndDelete({ _id: params.commentId })
			.then((deletedComment) => {
				if (!deletedComment) {
					return res.status(404).json({ message: 'No comment with this id!' });
				}
				return User.findByIdAndUpdate(
					{ _id: params.UserId },
					{ $pull: { comments: params.commentId } },
					{ new: true }
				);
			})
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: 'No user found with this id!' });
					return;
				}
				res.json(dbUserData);
			})
			.catch((err) => response.json(err));
	},
	// remove reply
	removeReply({ params }, res) {
		Comment.findOneAndUpdate(
			{ _id: params.commentId },
			{ $pull: { replies: { replyId: params.replyId } } },
			{ new: true }
		)
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => res.json(err));
	},
};

module.exports = commentController;
