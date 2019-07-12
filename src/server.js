const express = require('express');

const app = express();
app.use('/api', require('./user/controller'));

app.listen(3000, () => {
	console.log("listening on port 3000");
});