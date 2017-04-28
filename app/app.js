(function() {
    'use strict';
    // tooltip http://itsolutionstuff.com/post/angularjs-tooltip-using-ui-bootstrap-tpls-html-example-with-demoexample.html
    var app = angular.module('app', ['ui.router', 'angular-timezone-selector', 'ui.bootstrap', 'ngFileUpload', 'ngImgCrop']);
    app.config(config);
    app.run(run);


    function config($stateProvider, $urlRouterProvider) {

        // default route
        $urlRouterProvider.otherwise("/");

        $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'home/index.html',
                    controller: 'Home.IndexController',
                    controllerAs: 'vm',
                    data: {activeTab: 'home'}
                })
                .state('account', {
                    url: '/account',
                    templateUrl: 'account/index.html',
                    controller: 'Account.IndexController',
                    controllerAs: 'vm',
                    data: {activeTab: 'account'}
                })
                .state('singlechat', {
                    url: '/singlechat',
                    templateUrl: 'singlechat/index.html',
                    controller: 'Singlechat.IndexController',
                    controllerAs: 'vm',
                    data: {activeTab: 'singlechat'}
                });
    }

    function run($http, $rootScope, $window, Upload,$timeout) {
        // add JWT token as default auth header
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.jwtToken;

        // update active tab on state change
        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            $rootScope.activeTab = toState.data.activeTab;

        });
        

    }

    // manually bootstrap angular after the JWT token is retrieved from the server
    $(function() {
        // get JWT token from server
        $.get('/app/token', function(token) {
            window.jwtToken = token;

            angular.bootstrap(document, ['app']);
        });
    });
})();