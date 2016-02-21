require.config({
	baseUrl : "/",
	paths : {
		jQuery : "js/lib/jquery_1_10_min",
		dataTable : "datatables/media/js/jquery.dataTables.min",
		fusionChart : "js/lib/fusionCharts/fusioncharts",
		angular : "angular/angular.min",
		anGoogleplus : "angular-google-plus/dist/angular-google-plus.min",
		angDatatable : "angular-datatables/dist/angular-datatables",
		angularAMD : "angular-amd/angularAMD.min",
		angRoute : "angular-route/angular-route.min",
		angResource : "ng-resource/lib/angular-resource-1.2",
		angCookies : "angular-cookies/angular-cookies.min",
		angChart : "js/lib/fusionCharts/angular-fusioncharts.min",
		uiBootstrap : "js/lib/bootstrap-ui/ui-bootstrap-tpls",
		login : "js/login",
		search  : "js/search",
		polls : "js/polls",
		app : "js/appBootstrap/app",
		router : "js/appBootstrap",
		utils : "js/utils",
		facebook: 'fb/sdk/all'
	},
	shim : {
        "dataTable": { 
            exports: "dataTable"
        },
        "angular": {
            exports: "angular"
        },
        'anGoogleplus' : {
    		deps: ["angular"],
      		exports: 'googleplus'
    	},
        "angDatatable": {
        	exports: "angDatatable"
        },
        "angResource": {
            deps: ["angular"],
            exports : "angResource"
        },
        "angCookies": {
            deps: ["angular"],
            exports : "angCookies"
        },
        "angChart" : {
        	deps: ["angular"],
            exports : "angChart"	
        },
        "uiBootstrap" : {
        	deps: ["angular"],
            exports : "uiBootstrap"	
        },
		"angRoute" :  ["angular"],
		"angularAMD" : ["angular"]
		},
		'facebook' : {
      		exports: 'FB'
    	},
	deps: ["app"]
	
});
