const express = require('express');
const router = express.Router();
const userService = require('./service');

router.post('/register', (req, res, next) => {
	userService.register(req)
		.then(() => {
			res.cookie
		})
		.catch(err => {
			res.status(400).json({ Error: err })
		})
});

