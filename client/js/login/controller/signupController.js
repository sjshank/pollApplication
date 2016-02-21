define(['app',
	    'login/service/userService',
		'utils/pollAppUtils'],
		function(pollsApp,
				 userService,
				 pollAppUtils) {

			pollsApp.controller('signupCtrl', ['$scope', '$location', 'userService', 'userDetailService', 'checkResponseService',
					 function($scope, $location, userService, userDetailService, checkResponseService){
				
				$scope.user = {
					firstName : " ",
					lastName : " ",
					email : " ",
					password: " "
				};

				$scope.doRegistration = function(isValid){
					if (isValid) {
						userService.signup({
							userObj : $scope.user
						}).$promise.then(function(response){
            				if(checkResponseService.checkResponse(response, $scope, true)){
	            					$scope.hasError = false;
	            					var userData = response.data;
	            					if(typeof userData != undefined || userData !== null){
	            						userDetailService.userDetails.setUserDetails(userData);
	            						$location.path("/login");
	            					}
            				}else{
            					$scope.userErr = true;
            				}		
	            		}, function(err){
	            				$scope.userErr = true;
	            				checkResponseService.checkResponse(err, $scope, false);
	            		});
					}
				};
			}]);
});