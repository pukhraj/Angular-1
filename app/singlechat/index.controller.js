(function() {
    'use strict';

    angular
            .module('app')
            .controller('Singlechat.IndexController', Controller);

    function Controller($window, UserService, FlashService, $scope) {
        var vm = this;
        console.log('12121212121212')
        vm.user = null;
        vm.saveUser = saveUser;
        vm.deleteUser = deleteUser;

        initController();

        function initController() {
            // get current user
            UserService.GetCurrent().then(function(user) {
                vm.user = user;
            });
        }

        function saveUser() {
            UserService.Update(vm.user)
                    .then(function() {
                        FlashService.Success('User updated');
                    })
                    .catch(function(error) {
                        FlashService.Error(error);
                    });
        }

        function deleteUser() {
            UserService.Delete(vm.user._id)
                    .then(function() {
                        // log user out
                        $window.location = '/login';
                    })
                    .catch(function(error) {
                        FlashService.Error(error);
                    });
        }
    }

})();