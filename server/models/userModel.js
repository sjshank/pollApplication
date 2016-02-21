const db = require("../middlewares/db"),
	Schema = db.Schema;

var userModel = new Schema({
	first_name : {type: String, default: "Guest"},
	last_name : {type: String, default: "User"},
	name : {type: String, default: "Guest User"},
	email : {type: String, unique: true},  //create a unique index
	hashToken : {type: String},  //Storing hash value of token
	loggedin_at : {type: Date, default: new Date().toDateString()}
});

var user = db.model('UserModel', userModel);

module.exports = user;