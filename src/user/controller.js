const express = require('express');
const router = express.Router();
const userService = require('./service');

module.exports = router;

router.get('/church', (req, res) => {
	res.status(200).json({ success: true })
})

router.post('/register', (req, res) => {
	if (!req.body.username || req.body.password){
		res.status(400).json({ 
			success: false,
			error: "NO username or password"
		});
	};

	userService.register(req)
		.then(({ token }) => {
			// sets a jwt token with the user info 
			res.cookie('Information', token, {
				maxAge: 900000,
				httpOnly: true
			});
			res.status(200).json({
				success: true
			});
		})
		.catch(err => {
			res.status(400).json({ Error: err })
		})
});

router.post('/login', (req, res) => {})