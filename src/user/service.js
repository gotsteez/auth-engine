const config = require('../config.json')

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const User = db.User;

module.exports ={
	register,
	login
}

async function register({ username, password }) {
  // handle if username/password in route 
  let person;

  try {
    person = await User.findOne({ username: username });
  } catch (e) {
    console.error(e);
    throw 'Error connecting to database';
  }

  if (person) {
    throw "User Already Exists"
  }
	
	const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  
  const newUser = new User({ username, hash });

  try {
    await newUser.save();
  } catch (e) {
    console.error(e);
    throw 'UserIsAlreadyMade';
  }

	let token = jwt.sign(newUser.toJSON(), config.jwt.secret, { expiresIn: '1h' });
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