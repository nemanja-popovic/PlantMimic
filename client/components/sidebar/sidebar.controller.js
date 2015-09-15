'use strict';

angular.module('plantMimicApp')
  .controller('SidebarCtrl', function ($scope, $location, $http) {
    
    //Called every time route is changed
    $http.get('/api/schema').success(function (schemas) {
        $scope.sidebarSchemas = schemas;
    });
    
    $scope.isActive = function (route) {
        return route === $location.path();
    };
});