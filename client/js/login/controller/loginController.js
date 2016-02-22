define(['app',
        'facebook',
        'login/service/userService',
        'utils/pollAppUtils'],
        function(pollsApp,
                 facebook,
                 userService,
                 pollAppUtils) {

            pollsApp.controller('loginCtrl', ['$scope', '$rootScope', '$location', 'authFactory', 'GooglePlus',
                                     '$cookieStore', 'userService', 'checkResponseService',
                                 function($scope, $rootScope, $location, authFactory, GooglePlus, $cookieStore, userService, checkResponseService){
                console.log("Login controller");
                $scope.hasError = false;
                $rootScope.showLogout = false;


                FB.init({
                      appId      : '1551906885119402',
                      status     : true,
                      cookie     : true,
                      xfbml      : true,
                      version    : 'v2.5'
                });

                 $scope.signInCallback = function(authResult) {
                   if(authResult['status']['signed_in'])
                    {
                        authFactory.setToken(authResult.access_token);
                        var request = gapi.client.plus.people.get(
                        {
                            'userId': 'me'
                        });
                        request.execute(function (response)
                        {
                            if(response.name){    
                                var userDetails = {
                                    id : response.id || " ",
                                    name : response['displayName'],
                                    first_name : response['name']['givenName'],
                                    last_name : response['name']['familyName'],
                                    picture : response['image']['url'],
                                    email : response['emails'][0]['value']
                                }
                                userDetails.isFBLogin = false;
                                authFactory.setUserObj(userDetails);
                                processLogin(authFactory, userService, $scope, $location,checkResponseService);
                            }else{
                                $scope.hasError = true;
                                $scope.errorMsg = "Not authorized to access. Please log in."
                            }
                        });
                    }else{
                            $scope.hasError = true;
                            $scope.errorMsg = "Not authorized to access. Please log in."
                    }
                };



                $scope.doLogin = function(vendor){
                    try{
                        if(vendor === 'fb'){
                            if(!FB.getAuthResponse()){
                                FB.login(function(response) {
                                    if (response.authResponse && response.status === 'connected'){
                                           FB.api('/me', { locale: 'en_US', fields: 'name, email, id, first_name, last_name' },
                                                function(response) {
                                                    authFactory.setUserObj(response);
                                                    authFactory.setToken(FB.getAuthResponse().accessToken);
                                                    $rootScope.isFBLogin = true;
                                                    processLogin(authFactory, userService, $scope, $location,checkResponseService);
                                            });
                                    }
                                    else if (response.authResponse && response.status === 'not_authorized'){
                                            $scope.hasError = true;
                                            $scope.errorMsg = "Not authorized to access. Please log in."
                                    }else{
                                            $scope.hasError = true;
                                            $scope.errorMsg = "Service is temporarily unavailable."
                                    }  
                                });
                            }else{
                                $location.path('/search');
                            }
                        }else{
                                 gapi.auth.signIn({
                                'callback': $scope.signInCallback, // Function handling the callback.
                                'clientid': '915767291352-ecpictdg9a7v815i2k1l3rmcsr7op8qd.apps.googleusercontent.com',
                                'requestvisibleactions': 'http://schemas.google.com/AddActivity',
                                'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email',
                                'cookiepolicy': 'single_host_origin'
                            });
                        }
                    }catch(e){
                        console.log('Exception occurred while logging');
                    }
                };
        }]);


    function processLogin(authFactory, userService, $scope, $location, checkResponseService){
        userService.doLogin(
                        {
                           userObj : authFactory.getUserObj(),
                           token : authFactory.getToken()
                        }).$promise.then(function(response){
                            if(checkResponseService.checkResponse(response, $scope, true)){
                               $scope.hasError = false;
                                $location.path('/search');
                        }
                        }, function(err){
                            checkResponseService.checkResponse(err, $scope, false);
                        });
    };

});