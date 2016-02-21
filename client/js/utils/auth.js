define(['angular',
        'facebook'],
		function(angular,
                 facebook){

return function(webApp){
			'use strict';

			webApp.factory('authFactory', ['$cookieStore', '$cookies', function($cookieStore, $cookies){

                var authFact = {};
                authFact.setToken = function(aToken) {
                    $cookieStore.put('token', aToken);
                };
                authFact.getToken = function() {
                    return $cookieStore.get('token');
                };
                authFact.getUserObj = function() {
                    return $cookieStore.get('userObj');
                };
                authFact.setUserObj = function(uObject) {
                    $cookieStore.put('userObj', uObject);
                };
                authFact.clearCookies = function(){
                    try{
                        $cookieStore.remove('userObj');
                        $cookieStore.remove('token');
                    }catch(e){
                        console.log("cookie objects are empty");
                    }
                };

                return authFact;
            }]);

			webApp.run(['$rootScope', '$location', 'authFactory', function($rootScope, $location, authFactory){

				$rootScope.$on('$routeChangeStart', function(event, next, current){
                    try{
                        if(next.$$route.authenticated){
                            var isAuth = authFactory.getToken();
                            if (!isAuth) {
                                $location.path('/');
                            }
                        }

                    }catch(e){
                        console.log("Routing event is not working as expected");
                    }
                });

			}]);

            webApp.run([ '$rootScope', 'authFactory', '$location', function($rootScope, authFactory, $location) {
                $rootScope.logout = function(){
                    try{
                        if(authFactory.getUserObj().isFBLogin){
                            FB.logout(function(response) {
                                authFactory.clearCookies();
                                window.location = '#/login';
                            });
                        }else{
                            gapi.auth.signOut();
                                authFactory.clearCookies();
                                window.location = '#/login';
                        }
                    }catch(e){
                        console.log("Unable to logout");
                    }
                };
            }]);
		};
});