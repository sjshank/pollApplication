var PollModel = require("../models/pollModel");

exports.getPolls = function(req, res) {
	getPollList(requestObj = req, responseObj = res);
};
exports.savePoll = function(req, res) {
	const params = req.body;
	var pollModel = new PollModel(params.pollObject);
	pollModel.save(function(err, result){
		if (err) {
			console.log(err);
			var eMsg = checkErrorResponse(err);
			res.json({errMsg : eMsg});
		} else{
			console.log(result);
			res.json({result : "success"}); 
		}
	});
};
exports.getPoll = function(req, res) {
	
	const queryParm = req.query;
	PollModel.findById(queryParm.id, function(err, result){
		if (err) {
			res.json({errMsg : "Something went wrong in backend. We are working hard to resolve."});
		} else{
			res.json({data : result});
		}
	});
};
exports.deletePoll = function(req, res) {
	const queryParm = req.query;
	console.log(req.query);
	PollModel.find({ id: queryParm.id }).remove().exec(
				function(err, result){
					if(err){
						res.json({errMsg : "Something went wrong in backend. We are working hard to resolve."});
					}else{
						console.log(result);
						getPollList(requestObj = req, responseObj = res);
					}
			});
};
exports.updatePoll = function(req, res) {
	const reqPollObj = req.body.pollObject;
	PollModel.findByIdAndUpdate(reqPollObj._id, { $set:
		  {
			multipleChoices : reqPollObj.multipleChoices,
			voted : true
		  }
		},
		{
    		new: true
  		},
		function(err, result){
			if(err){
				res.json({errMsg : "Something went wrong in backend. We are working hard to resolve."});
			}else{
				res.json({data : result});
			}
	});
	
};

function checkErrorResponse(err){
	if(err.name === 'MongoError' && err.code === 11000){
		return "This question already been added. Please change your question";
	}
};

function getPollList(requestObj, responseObj){
	var queryParm = requestObj.query;
	console.log(requestObj.query);
	PollModel.find({question : { $regex : queryParm.searchQuery}}, function(err, result){
		if (err) {
			responseObj.json({errMsg : "Something went wrong in backend. We are working hard to resolve."});
		} else{
			responseObj.json({data : result});
		}
	});
};