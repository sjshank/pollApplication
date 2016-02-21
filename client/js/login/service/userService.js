define(['app'],
		function(pollsApp){

			pollsApp.factory('userService', ['$resource', function($resource){
				return $resource('/auth/login', {}, {
				 doLogin: {
				 			   method: 'POST'
				 		  }
				  });
			}]);

			pollsApp.factory('userDetailService', function() {

					this.userDetails = {
						firstName : "",
						lastName : "",
						email : "",
						created_at : new Date().toString()
					};
					this.userDetails.setUserDetails = function(obj) {
						this.firstName = obj.firstName;
						this.lastName = obj.lastName;
						this.email = obj.email;
						this.created_at = obj.created_at;
					};

					this.userDetails.getUserDetails = function() {
						return this;
					};

					return {
						userDetails : this.userDetails
					};
			});
});