var UserModel = require("../models/userModel"),
	bCrypt = require('bcrypt-nodejs');

exports.doLogin = function(req, res) {
	console.log("Inside login");

	if(typeof req.body != undefined || req.body !== ""){
		if(typeof req.body.userObj == undefined || req.body.userObj === ""
				 || typeof req.body.token == undefined || req.body.token === ""){

			res.json({validationMsg : "User details are empty"});
		}else{
			var userObj = req.body.userObj;
			userObj.hashToken = generateHash(req.body.token);
			console.log(userObj.hashToken);
			UserModel.findOneAndUpdate(
				{ email: userObj.email },
				{
				 	$set: userObj
				 	},
				{
					upsert: true,
			    	new : true
			    }, function(err, result){
						if(err){
							console.log(err);
							res.json({errMsg : "Something went wrong in backend. We are working hard to resolve."});
						}else{
							res.json({result : "success"});
						}
			});
		}
	}else{
		res.json({validationMsg : "Request is empty"});
	}
};

function generateHash(token){
	if(typeof token != undefined && typeof token != undefined){
	 	return bCrypt.hashSync(token, bCrypt.genSaltSync(10), null);
	}
};

