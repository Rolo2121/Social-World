const router = require('express').Router();
// const User = require('../models/User');
const {
	getAllUser,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
} = require('../../controllers/user-controller');

router.route('/').get(getAllUser).post(createUser);

router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

// router.post('/users', async (req, res) => {
// 	const user = await new User({
// 		username: 'jake',
// 		email: 'jake@example.com',
// 	});
// 	await user.save();
// 	res.send('ok');
// });

module.exports = router;
