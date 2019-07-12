const config = require('../config.json')

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const User = db.User;

module.exports ={
	register,
	login
}

function register({ username, password, discordId }) {
	// handle if username/password in route 
	if (!discordId) {
		discordId = null;
	};

	const person = User.findOne({ username: username });
	if (!person) {
		throw "User Already Exists"
	}
	
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(password, salt);

	let user = {};
	try {
		user = new User({ username: username, hash: hash, discordId: discordId });
	}
	catch (MongoError) {
		throw MongoError
	}

	try {
		user.save();
	} 
	catch (MongoError) {
		throw "UserIsAlreadyMade"
	}

	let token = jwt.sign(user.toJSON(), config.jwt.secret, { expiresIn: '1h' });
	return token;
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