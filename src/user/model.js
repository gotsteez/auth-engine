const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: { type: String, required: true, unique: true },
	hash: { type: String, required: true },
	createdDate: { type: String, required: true, default: Date.now() },
	discordID: { type: String, default: null }
})

userSchema.set('toJson', { virutals: "None" })

module.exports= mongoose.model("User",userSchema);