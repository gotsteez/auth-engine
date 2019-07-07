const fs = require('fs');
const path = require('path');
const config = fs.readFileSync(path.join(__dirname, '..', "config.json"))

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const User = db.User;


function register({ username, password, discordId }) {
	// handle if username/password in route 

	if (!discordId) {
		discordId = null;
	};

	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(password, salt);

	const user = new User({ username: username, hash: hash, discordId: discordId })
	console.log(user);
	
	user.save();
	return jwt.sign(user, config.jwt.secret, { expiresIn: '1h' })
}

function login ({ username, password }) {
	// handle if username/password in route 

	const person = User.findOne({ username: username });
	if (!person) {
		throw "NoUserFound"
	}

	let rightPassword = bcrypt.compareSync(password, person.hash);
	if (!rightPassword) {
		throw "Wrong password"
	}

	return person
}

async function getByID(id) {
	return await User.findById(id)
}