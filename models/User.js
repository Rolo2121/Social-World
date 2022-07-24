const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
	{
		userName: {
			type: String,
			unique: true,
			require: true,
			trim: true,
		},

		createdAt: {
			type: Date,
			default: Date.now,
			get: (createdAtVal) => dateFormat(createdAtVal),
		},
		email: {
			type: String,
			required: true,
			max: 50,
			unique: true,
		},

		friends: {
			type: Array,
			default: [],
		},
		thoughts: [
			{
				type: Schema.Types.ObjectId,
				ref: 'thoughts',
			},
		],
	},
	{
		toJSON: {
			virtuals: true,
			getters: true,
		},
		id: false,
	}
);

UserSchema.virtual('friendCount').get(function () {
	return this.friends.reduce(
		(total, friend) => total + friend.count.length + 1,
		0
	);
});
const User = model('User', UserSchema);
module.exports = User;
