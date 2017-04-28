    app = angular.module('myChatApp_', ['ngRoute']);
    app.controller('myChatController_', ['$scope','$http','$timeout', function($scope,$http,$timeout){
        $scope.cars = [];
        $scope.loading = true;
        $timeout(function () {
            /* $scope.loading = false;*/
        }, 2000);
        $scope.isLoading = function (){
            $scope.loading = false;
            console.log("loading: ",$scope.loading);
        }
        
        
        $scope.loginCheck = function () {
           console.log("Login: ",'Hello ');            
        };
        $scope.clickMe = function() {
         
        }

    }])
