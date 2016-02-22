
define([//'jQuery',
        'fusionChart',
        'angular',
        'angRoute',
        'angularAMD',
        'angResource',
        'router/appRouter',
        'utils/pollAppConstants',
        'utils/pollAppDirectives',
        'utils/pollAppFilters',
        'utils/auth',
        'angChart',
        'uiBootstrap',
        'anGoogleplus',
        'angCookies',
        'chart',
        'angularChart'],
        function(//$,
                 fusionChart,
                 angular,
                 angRoute,
                 angularAMD,
                 angResource,
                 router,
                 pollAppConstants,
                 pollAppDirectives,
                 pollAppFilters,
                 auth,
                 angChart,
                 uiBootstrap,
                 anGoogleplus,
                 angCookies,
                 chart,
                 angularChart) {

        //var _self = this;
        'use strict';

        var webApp = angular.module("pollsApp", ["ngRoute", "ngResource", "ng-fusioncharts", "ui.bootstrap", "googleplus", "ngCookies", "chart.js"], function($httpProvider){});
        router(webApp);
        auth(webApp);
        pollAppConstants(webApp);
        pollAppDirectives(webApp);
        
        webApp.config(function() {
                gapi.client.setApiKey('AIzaSyA5Xzmf-O9hxw69GFChQSa-1xzwtKGN2aE'); //set your API KEY
                gapi.client.load('plus', 'v1',function(){});
        });


        return angularAMD.bootstrap(webApp);
});