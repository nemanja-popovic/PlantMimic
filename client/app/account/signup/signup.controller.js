'use strict';

angular.module('plantMimicApp')
  .controller('SignupCtrl', function ($scope, Auth, $location, $window) {
    $scope.user = {};
    $scope.errors = {};
    
    $scope.imageCropStep = 1;
    $scope.imageCropResult = {};
    $scope.showImageCropper = true;
    
    $scope.register = function (form) {
        
        $scope.submitted = true;
        
        if (form.$valid) {
            
            Auth.createUser({
                name: $scope.user.name,
                email: $scope.user.email,
                password: $scope.user.password,
                userImage: $scope.imageCropResult
            })
        .then(function () {
                // Account created, redirect to home
                $location.path('/main');
            })
        .catch(function (err) {
                err = err.data;
                $scope.errors = {};
                
                // Update validity of form fields that match the mongoose errors
                angular.forEach(err.errors, function (error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.message;
                });
            });
        }
    };
    
    $scope.loginOauth = function (provider) {
        $window.location.href = '/auth/' + provider;
    };
});