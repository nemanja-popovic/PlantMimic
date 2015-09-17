'use strict';

angular.module('plantMimicApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    
    $scope.unreadNotificationsCount = 0;
    $scope.notifications = [];
    
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    
    $scope.logout = function () {
        Auth.logout();
        $location.path('/');
    };
    
    $scope.isActive = function (route) {
        return route === $location.path();
    };
    
    $scope.getBreadcrumb = function () {
        return 'PlantMimic' + $location.url();
    };
    
    $scope.openNotificationsDropdown = function () {
        $scope.unreadNotificationsCount = 0;
    };
});