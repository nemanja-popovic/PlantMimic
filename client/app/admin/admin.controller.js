'use strict';

angular.module('plantMimicApp')
  .controller('AdminCtrl', function ($scope, $http, Auth, User, Modal, toaster) {
    
    // Use the User $resource to fetch all users
    $scope.users = User.query();
    
    // Modal.confirm.delete returns a function that will open a modal when ran
    // We use closure to define the callback for the modal's confirm action here in the controller
    $scope.delete = function (user) {
        Modal.confirm.delete(function () {
            User.remove({ id: user._id });
            
            toaster.pop('success', 'User removed', '');
            
            angular.forEach($scope.users, function (u, i) {
                if (u === user) {
                    $scope.users.splice(i, 1);
                }
            });
        })(user.name);
    };
    
    $scope.changeRights = function (user) {
        var text = 'Are you sure you want to change rights for ' + user.name + '?';
        Modal.confirm.confirm(function () {
            
            User.changeRights({ id: user._id }, {}).$promise.then(function () {
                for (var i = 0; i < $scope.users.length; i++) {
                    if ($scope.users[i]._id === user._id) {
                        if ($scope.users[i].role === 'admin') {
                            $scope.users[i].role = 'user';
                        }
                        else {
                            $scope.users[i].role = 'admin';
                        }
                    }
                }
                toaster.pop('success', 'Change rights', 'Successfully changed rights for ' + user.name);
            });
            
        })(text);
    };
});
