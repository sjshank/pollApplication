var router = require("./init"),
	db = require("../middlewares/db"),
	pollController = require("./pollsController"),
	userController = require("./userController");


router.route('/login')
	.post(function(req, res){
		userController.doLogin(reqObj = req, res);
	});

router.route('/polls')
	.get(function(req, res){
		pollController.getPolls(reqObj = req, res);
	});

router.route('/poll')
	.get(function(req, res){
		pollController.getPoll(reqObj = req, res);
	})
	.post(function(req, res){
		pollController.savePoll(reqObj = req, res);
	})
	.delete(function(req, res){
		pollController.deletePoll(reqObj = req, res);
	})
	.put(pollController.updatePoll);





module.exports = router;