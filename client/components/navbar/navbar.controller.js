'use strict';

angular.module('plantMimicApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, socket) {
    
    $scope.unreadNotificationsCount = 0;
    $scope.unreadNotifications = [];
    
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
    
    $scope.seeAllNotifications = function () {
        $location.path('/notifications');
    };

    socket.syncNotifications('signal_point:notification', $scope.unreadNotifications, function (event, notification) {
        $scope.unreadNotifications.unshift(notification);
        $scope.unreadNotificationsCount++;
        if ($scope.unreadNotifications.length > 10) {
            $scope.unreadNotifications.pop();
        }
        console.log($scope.unreadNotifications);
    });
});