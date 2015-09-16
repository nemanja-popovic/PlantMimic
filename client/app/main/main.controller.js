'use strict';

angular.module('plantMimicApp')
    .controller('MainCtrl', function ($scope, $http, socket, schemas) {
    $scope.schemas = schemas;
});
