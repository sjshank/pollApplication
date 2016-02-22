define(['angularAMD',
		'angular',
		'angRoute'],
	function(angularAMD,
			 angular,
			 angRoute){

	return function(webApp){
		var _self = this;
		'use strict';

		webApp.constant('pollConstants', {
			SERVICE_ERROR : "Service is temporarily unavailable. Please try after sometime.",
			COLORS : ['#0D8ECF','#F8FF01','#FCD202', '#FF6600', '#0D52D1']
		});

		webApp.run([ '$rootScope', function($rootScope) {
			$rootScope.isNewPollAdded = false;
			$rootScope.persistQuery = false;
			$rootScope.successMsg = "Poll has been added successfully";
			$rootScope.searchResult = "Search Results : Number of records matching search criteria ";
			$rootScope.choicesText = "Please select one from the following choices and caste you vote :";
			$rootScope.errorMsg = "No records found based on searched criteria";
			$rootScope.emailErrMsg = "Please enter valid email id";
			$rootScope.passwordErrMsg = "Please enter valid password";
			$rootScope.fNameErrMsg = "Please enter valid first name";
			$rootScope.lNameErrMsg = "Please enter valid last name";
		}]);
	};
});

