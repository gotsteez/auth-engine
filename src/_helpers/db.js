const config = require('../config.json');
const mongoose = require('mongoose');


mongoose.connect(config.db.uri, { useNewUrlParser: true, useCreateIndex: true })
	.then(() => {
		mongoose.Promise = global.Promise
	})
	.catch(err => {
		console.log(err)
	});

module.exports = {
	User: require('../user/model'),
}