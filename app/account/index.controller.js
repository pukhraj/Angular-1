(function () {
    'use strict';

    angular
        .module('app')
        .controller('Account.IndexController', Controller);

    function Controller($window,$scope,$http,$timeout,Upload, UserService, FlashService) {
        var vm = this;

        vm.user = null;
        vm.saveUser = saveUser;
        vm.deleteUser = deleteUser;

        initController();
        $scope.upload = function(dataUrl, name) {
            //https://github.com/danialfarid/ng-file-upload
            $scope.progress = -1;
            $scope.result = false;
            console.log("File Name : ",name);
                Upload.upload({
                    url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                    data: {
                        file: Upload.dataUrltoBlob(dataUrl, name)
                    },
                }).then(function(response) {
                    $timeout(function() {
                        $scope.result = response.data;
                        $scope.progress = false;
                    });
                    $timeout(function() {
                        $scope.result = false;
                    },5000);
                }, function(response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.data;
                }, function(evt) {
                    $scope.progress = -1;
                    $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
                    
                });
        }

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
        }

        function saveUser() {
            UserService.Update(vm.user)
                .then(function () {
                    FlashService.Success('User updated');
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }

        function deleteUser() {
            UserService.Delete(vm.user._id)
                .then(function () {
                    // log user out
                    $window.location = '/login';
                })
                .catch(function (error) {
                    FlashService.Error(error);
                });
        }
    }

})();