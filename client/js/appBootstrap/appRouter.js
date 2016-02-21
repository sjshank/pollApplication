define(['angularAMD',
		'angRoute'],
	function(angularAMD,
			 angRoute){

	return function(webApp){
		var _self = this;
		'use strict';

		webApp.config( function ($routeProvider) {
			 $routeProvider
			 .when("/login", angularAMD.route({
				 templateUrl: 'views/login.htm', controller: 'loginCtrl', controllerUrl: 'login/controller/loginController'
			 }))
			 .when("/signup", angularAMD.route({
				 templateUrl: 'views/signup.htm', controller: 'signupCtrl', controllerUrl: 'login/controller/signupController'
			 }))
			 .when("/about", angularAMD.route({
				 templateUrl: 'views/about.htm', controller: 'aboutCtrl', controllerUrl: 'search/controller/aboutController', authenticated: false
			 }))
			 .when("/contact", angularAMD.route({
				 templateUrl: 'views/contact.htm', controller: 'contactCtrl', controllerUrl: 'search/controller/contactController', authenticated: false
			 }))
			 .when("/search", angularAMD.route({
				 templateUrl: 'views/search.htm', controller: 'searchCtrl', controllerUrl: 'search/controller/searchController', authenticated: true
			 }))
			 .when("/addPoll", angularAMD.route({
				 templateUrl: 'views/addPoll.htm', controller: 'addPollCtrl', controllerUrl: 'polls/controller/pollController', authenticated: true
			 }))
			 .when("/getPoll/:pollID", angularAMD.route({
				 templateUrl: 'views/getPoll.htm', controller: 'getPollCtrl', controllerUrl: 'polls/controller/pollController', authenticated: true
			 }))
			 .otherwise({redirectTo: "/login"});
			 });
	};
});