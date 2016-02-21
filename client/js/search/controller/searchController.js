define(['app',
		'search/service/searchService',
		'polls/service/pollService',
		'utils/pollAppUtils',
		'facebook'],
		function(pollsApp,
				searchService,
				pollService,
				pollAppUtils,
				facebook) {

			pollsApp.controller('searchCtrl', ['$scope', '$rootScope', 'searchPollService', 'authFactory',
												 'pollService', 'checkResponseService', 'searchPollPersistantService',
					 function($scope, $rootScope, searchPollService, authFactory,
					 			 PollService, checkResponseService, searchQueryPersistantService){

				$scope.displayRecords = false;
				$scope.displayWarning = false;
				$rootScope.showLogout = true;
				$scope.searchQueryModel = searchQueryPersistantService.getSearchQuery();

				$scope.hideSuccessMsg = function(){
					$rootScope.isNewPollAdded = false;
				}

				if(typeof $scope.searchQueryModel !== 'undefined' && $scope.searchQueryModel.searchText !== "" 
					&& $rootScope.persistQuery){
					getPollList($scope, searchPollService, checkResponseService);
				}else{
					$scope.searchQueryModel.searchText = "";
				}

				$scope.searchPolls = function(){
					searchQueryPersistantService.setSearchQuery($scope.searchQueryModel);
					getPollList($scope, searchPollService, checkResponseService);
				};

				$scope.deletePoll = function($event){
					var id = $event.target.id;
					var c = window.confirm("Are you sure want to delete poll ?");
					if(c === true){

						PollService.deletePoll(
							{
			              		 pollID : id,
			              		 searchQuery : $scope.searchQueryModel.searchText
            				}).$promise.then(function(response){
            					$rootScope.persistQuery = false;
            					checkResponse(response, $scope, checkResponseService);
	            			}, function(err){
	            				checkResponseService.checkResponse(err, $scope, false);
	            			});

					}else{
						return;
					}
				};

				$scope.logout = function(){
					console.log('hey');
				}
            
            }]);


			function getPollList($scope, searchPollService, checkResponseService){
				searchPollService.searchPolls(
           		 		{
			               searchQuery : $scope.searchQueryModel.searchText
            			}).$promise.then(function(response){
            				checkResponse(response, $scope, checkResponseService);
            			}, function(err){
            				checkResponseService.checkResponse(err, $scope, false);
            			});
            };

            function checkResponse(response, $scope, checkResponseService){
            	if(checkResponseService.checkResponse(response, $scope, true)){

            					$scope.hasError = false;
	            				$scope.totalRecords = response.data.length;
	            				$scope.pollList = response.data; 
	            				$scope.displayRecords = true;
								$scope.displayWarning = false;
            			}
            		};
});

