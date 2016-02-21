const mongoose = require("mongoose"),
	URL = "mongodb://127.0.0.1:27017/POLLS_APP";

mongoose.connect(URL, callback);

function callback(err) {
	if(err){
		console.log("Unable to connect mongodb " + err);
		process.exit(1);
	}else{
		console.log("Connection established !");
	}
};

module.exports = mongoose;