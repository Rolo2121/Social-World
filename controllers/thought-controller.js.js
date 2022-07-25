const { response } = require('express');
const { Thought, User } = require('../models');

const thoughtController = {
	// add comment to user
	addThought({ params, body }, res) {
		console.log(body);
		Thought.create(body)
			.then(({ _id }) => {
				return User.findOneAndUpdate(
					{ _id: params.UserId },
					{ $push: { thoughts: _id } },
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
		Thought.findOneAndUpdate(
			{ _id: params.thoughtId },
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
	removeThought({ params }, res) {
		Thought.findOneAndDelete({ _id: params.thoughtId })
			.then((deletedThought) => {
				if (!deletedThought) {
					return res.status(404).json({ message: 'No thought with this id!' });
				}
				return User.findByIdAndUpdate(
					{ _id: params.UserId },
					{ $pull: { thoughts: params.thoughtId } },
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
		Thought.findOneAndUpdate(
			{ _id: params.thoughtId },
			{ $pull: { replies: { replyId: params.replyId } } },
			{ new: true }
		)
			.then((dbUserData) => res.json(dbUserData))
			.catch((err) => res.json(err));
	},
};

module.exports = thoughtController;
