	define(['app'],
		function(pollsApp){

			pollsApp.factory('searchPollService', ['$resource', function($resource){

				return $resource('/api/polls', {}, {
						searchPolls: {
						  			method: 'GET',
						  			isArray: false
						  		  }
						  });
				}

			]);

			pollsApp.factory('searchPollPersistantService', function(){
				
				var searchQueryModel = {
					searchText : ""
				};

				var getSearchQuery = function(){
					return searchQueryModel;
				}

				var setSearchQuery = function(obj){
					searchQueryModel = obj;
				}

				return {
					getSearchQuery : getSearchQuery,
					setSearchQuery : setSearchQuery
				}
			});

});