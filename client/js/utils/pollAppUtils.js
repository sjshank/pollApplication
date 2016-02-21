	define(['app'],
		function(pollsApp){

			'use strict';

			pollsApp.service('checkResponseService', ['$http', '$rootScope', 'pollConstants',
						function($http, $rootScope, pollConstants){

				function checkSuccessResponse(data, scope) {
					var success = false;
					if (!data || data == null, data == undefined) {
						scope.errorMsg = pollConstants.SERVICE_ERROR;
						scope.hasError = true;
					} else if (data.errMsg) {
						scope.errorMsg = data.errMsg;
						scope.hasError = true;
					} else if (data.validationMsg) {
						scope.errorMsg = data.validationMsg;
						scope.hasError = true;
					} else {
						scope.hasError = false;
						success = true;
					}
					return success;
				};
				function checkErrorResponse(scope) {
					scope.errorMsg = pollConstants.SERVICE_ERROR;
					scope.hasError = true;
				};

				this.checkResponse = function(data, scope, flag){
					if (flag) {
						return checkSuccessResponse(data, scope);
					} else{
						checkErrorResponse(scope);
					}
				};

			}]);
});



