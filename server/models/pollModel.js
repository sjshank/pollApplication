const db = require("../middlewares/db"),
	Schema  = db.Schema;

var pollSchema = new Schema({
	question : {type: String, required: true, unique: true},
	multipleChoices : [],
	voted : {type: Boolean, default: false},
	created_at : {type: Date, default: new Date().toDateString()},
	created_by : {type: String, default: "Developer"},
	updated_at : {type: Date, default: new Date().toDateString()}
});

var poll = db.model('PollModel', pollSchema);

module.exports = poll;