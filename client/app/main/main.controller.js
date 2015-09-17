'use strict';

angular.module('plantMimicApp')
    .controller('MainCtrl', function ($scope, $http, socket, schemas, projectMetrics) {
    $scope.schemas = schemas;
    $scope.projectMetrics = projectMetrics;
});
