define(['app',
	 	'polls/service/pollService',
		'utils/pollAppUtils',
		'utils/pollAppDirectives',
		'utils/pollAppConstants',
		//'fusionChart',
		'angChart',
		'uiBootstrap'],
		function(pollsApp,
				pollService,
				pollAppUtils,
				pollAppDirectives,
				pollAppConstants,
				//fusionChart,
				angChart,
				uiBootstrap) {


			/*
			*	Controller for retrieving poll based on poll id
			*/
			pollsApp.controller('getPollCtrl', ['$scope', '$rootScope', '$routeParams',
								 '$location', 'pollService', 'checkResponseService', 'pollConstants',
					 function($scope, $rootScope, $routeParams, $location,
					 			 PollService, checkResponseService, pollConstants){
								
				$scope.poll = {};
				$scope.displayChart = false;
				$scope.displayChoices = true;
				$scope.disableVoteBtn = false;
				$scope.totalVotes  = 0;
				$scope.ChartTypes = ['PolarArea', 'Pie', 'Doughnut'];
				$scope.selectedItem = "Doughnut";
				$scope.type = $scope.selectedItem;
				var optSelected = "";

								/*$scope.myDataSource = {
						                chart: {
						                    caption: "Voting Summary",
						                    bgColor: "#F0F8FF !important"
						                },
						                data:[],
						            };*/
				
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
            					renderChart($scope, optSelected, pollConstants);
            				}
            			}, function(err){
            				checkResponseService.checkResponse(err, $scope, false);
            			});
            	};

            	$scope.changeChart = function(sItem){
            		$scope.type = sItem;
            		renderChart($scope, optSelected, pollConstants);
            	}


			}]);

			pollAppDirectives(pollsApp);

			function renderChart($scope, optSelected, pollConstants){
				if($scope.poll.voted){

            						$scope.myDataSource = {
										labels : [],
										data : [],
										colors : []
									};
									$scope.totalVotes = 0;
            						$scope.poll.multipleChoices.forEach(function(val, index, choices){

            							$scope.totalVotes = $scope.totalVotes + val['numberOfVotes'];
	         							$scope.myDataSource.labels.push(val['text']);
	         							$scope.myDataSource.data.push(val['numberOfVotes']);
	         							$scope.myDataSource.colors.push(pollConstants.COLORS[index]);

	         							/*$scope.myDataSource.data.push({
	            								'label' : $scope.poll.multipleChoices[i]['text'],
	            								'value' : $scope.poll.multipleChoices[i]['numberOfVotes']
	            							});*/
            						});
            							/*$scope.myDataSource.chart['subCaption'] = "Total " + $scope.totalVotes  + " votes has been counted so far." +
            																	  " You voted for " + optSelected; */ 
            							$scope.optSelected = optSelected;
            							$scope.displayChart = true;
	            						$scope.displayChoices = false;
	            						$scope.disableVoteBtn = true;
            					}
            };



			/*
			*	Controller for adding new poll
			*/

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