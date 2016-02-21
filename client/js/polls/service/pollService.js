define(['app'],
		function(pollsApp){

			pollsApp.factory('pollService', ['$resource', function($resource){
				return $resource('/api/poll', {}, {
				 getPoll: {
				  			method: 'GET',
				  			isArray: false
				  		  },
				 updatePoll: {
				 			   method: 'PUT'
				 		  },
				 deletePoll: {
						 		method: 'DELETE'
						  }
				  });
			}]);

			pollsApp.factory('pollModelFactory', function(){

				this.pollModelObj = {
					question : "",
					multipleChoices : [
						{text : "", numberOfVotes : 0, choiceID : "choice1"},
						{text : "", numberOfVotes : 0, choiceID : "choice2"},
						{text : "", numberOfVotes : 0, choiceID : "choice3"}
						]
				};
				this.setPollModel = function(obj) {
					this.question = obj.question;
					this.multipleChoices = obj.multipleChoices;
				};
				this.getPollModel = function() {
					return this.pollModelObj;
				};

				return {
					pollModel : this.pollModelObj,
					getPollModel : this.getPollModel(),
					setPollModel : this.setPollModel
				};

			});
});