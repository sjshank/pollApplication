define(['app',
	 	'polls/service/pollService',
		'utils/pollAppUtils',
		'utils/pollAppDirectives',
		'fusionChart',
		'angChart',
		'uiBootstrap'],
		function(pollsApp,
				pollService,
				pollAppUtils,
				pollAppDirectives,
				fusionChart,
				angChart,
				uiBootstrap) {

			pollsApp.controller('getPollCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 'pollService', 'checkResponseService',
					 function($scope, $rootScope, $routeParams, $location, PollService, checkResponseService){
								
				$scope.poll = {};
				$scope.displayChart = false;
				$scope.displayChoices = true;
				$scope.disableVoteBtn = false;
				$scope.totalVotes  = 0;
				$scope.myDataSource = {
						                chart: {
						                    caption: "Voting Summary",
						                    bgColor: "#F0F8FF !important"
						                },
						                data:[],
						            };
				PollService.getPoll(
           		 		{
			               id : $routeParams.pollID
            			}).$promise.then(function(response){
            				if(checkResponseService.checkResponse(response, $scope, true)){
            					$rootScope.persistQuery = true;
            					$scope.poll = response.data; 
            			}
            			}, function(err){
            				checkResponseService.checkResponse(err, $scope, false);
            			});

            	$scope.vote = function(){
            			if(typeof $scope.addPollForm.choiceSelected === 'undefined' || $scope.addPollForm.choiceSelected === ""){
            				$scope.hasError = true;
            				$scope.errorMsg = "Please select atleast one option to vote";
            				return;
            			}
            			$scope.hasError = false;
            			for(var i=0; i <= $scope.poll.multipleChoices.length - 1; i++){
            				var optSelected = "";
            				if($scope.addPollForm.choiceSelected === $scope.poll.multipleChoices[i]['choiceID']){
            					optSelected = $scope.poll.multipleChoices[i]['text'];
            					$scope.poll.multipleChoices[i]['numberOfVotes'] = $scope.poll.multipleChoices[i]['numberOfVotes'] + 1;
            					break;
            				}
            			}

            		PollService.updatePoll(
           		 		{
			               pollObject : $scope.poll
            			}).$promise.then(function(response){
            				if(checkResponseService.checkResponse(response, $scope, true)){
            					$scope.poll = response.data;
            					renderChart($scope, optSelected);
            				}
            			}, function(err){
            				checkResponseService.checkResponse(err, $scope, false);
            			});
            	};



			}]);



			function renderChart($scope, optSelected){
				if($scope.poll.voted){

            						$scope.myDataSource.data = [];
            						for(var i=0; i <= $scope.poll.multipleChoices.length - 1; i++){
            							$scope.totalVotes = $scope.totalVotes + $scope.poll.multipleChoices[i]['numberOfVotes'];
	            							$scope.myDataSource.data.push({
	            								'label' : $scope.poll.multipleChoices[i]['text'],
	            								'value' : $scope.poll.multipleChoices[i]['numberOfVotes']
	            							});
            						}	
            							$scope.myDataSource.chart['subCaption'] = "Total " + $scope.totalVotes  + " votes has been counted so far." +
            																	  " You voted for " + optSelected;  
            							$scope.displayChart = true;
	            						$scope.displayChoices = false;
	            						$scope.disableVoteBtn = true;
            					}
            };


			pollsApp.controller('addPollCtrl', ['$scope', '$rootScope', '$location', 'pollService', 'pollModelFactory', 'checkResponseService',
					 function($scope, $rootScope, $location, PollService, pollModelFactory, checkResponseService){
				
				$scope.choiceLimit = false;
				$rootScope.persistQuery = false;
				$scope.showModal = false;
				$scope.pollModel = {
							question : "",
							multipleChoices : [
											{text : "", numberOfVotes : 0, choiceID : "choice1"},
											{text : "", numberOfVotes : 0, choiceID : "choice2"},
											{text : "", numberOfVotes : 0, choiceID : "choice3"}
										]
									};
				
				$scope.addChoice = function(){
						var totalChoice = $scope.pollModel.multipleChoices.length;
						$scope.pollModel.multipleChoices.push(
							{
								text : "",
								numberOfVotes : 0,
								choiceID : "choice"+(totalChoice + 1)
							});
						if(totalChoice === 4){
							$scope.choiceLimit = true;
						}
				};

				$scope.addNewPoll = function($event){
					var AddPoll = new PollService();
					AddPoll.pollObject = $scope.pollModel;
					AddPoll.$save(function(response){
            				if(checkResponseService.checkResponse(response, $scope, true)){
            					if(response.result){
            						$rootScope.isNewPollAdded = true;
            						$location.path("search");
    								//$scope.showModal = true;
            					}
            				}
            			}, function(err){
            				checkResponseService.checkResponse(err, $scope, false);
            			});
				};

				$scope.redirectToPage = function($event){
					$scope.showModal = false;
					if($event.toElement.id === "searchPollBtn"){
						$(".modal-backdrop").addClass("displayNone");
						$location.path("search");
						
					}
					else if($event.toElement.id === "newPollBtn"){
						$(".modal-backdrop").addClass("displayNone");
						$location.path("addPoll");
						
					}
				};
			}]);

});