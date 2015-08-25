'use strict';

angular.module('plantMimicv1App')
  .controller('MainCtrl', function ($scope, $http, socket, schemas) {
      $scope.schemas = schemas;

      $http.get('/api/schema').success(function (schemas) {
          $scope.schemas = schemas;
          socket.syncUpdates('schema', $scope.schemas);
      });

      $scope.$on('$destroy', function () {
          //socket.unsyncUpdates('schema');
      });
  });
