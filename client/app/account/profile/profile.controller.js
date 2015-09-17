'use strict';

angular.module('plantMimicApp')
  .controller('ProfileCtrl', function ($scope, user, Auth, toaster, $location) {
    $scope.errors = {};
    
    $scope.user = user;
     
    $scope.imageCropStep = 1;
    $scope.imageCropResult;
    $scope.showImageCropper = true;
   
    if (!!$scope.user.userImage) {
        $scope.imageCropResult = $scope.user.userImage;
    }
    
    $scope.updateProfile = function (form) {
        $scope.submitted = true;
        if (form.$valid) {
            Auth.updateProfile($scope.user.name, $scope.imageCropResult)
        .then(function () {
                $scope.message = 'Profile updated.';
                toaster.pop('success', '', 'Profile successfully updated.');
                
                $location.path('/main');
            })
        .catch(function () {
                $scope.message = '';
                toaster.pop('error', 'Profile update failed.', 'Please try again.');
            });
        }
    };
});
