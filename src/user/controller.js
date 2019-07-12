const express = require('express');
const userService = require('./service');
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.urlencoded({
	extended: false
}));
router.use(bodyParser.json());

router.get('/church', (req, res) => {
	res.status(200).json({ success: true })
});

router.route('/register')
	.post((req, res) => {
		console.log(req.body);
		
		if (!req.body.username || !req.body.password){
			res.status(400).json({ 
				success: false,
				error: "No username or password"
			});
			throw "Incorrect parameters"
		};

		let token;
		try {
			token = userService.register(req.body);
		}
		catch (err) {
			res.status(400).json({
				success: false,
				message:err
			});
			throw err
		};

		res.cookie('Information', token, {
			maxAge: 900000,
			httpOnly: true
		});
		res.status(200).json({
			success: true,
			token: token
		});
});

router.post('/login', (req, res) => {})

module.exports = router;