'use strict';

angular.module('plantMimicApp')
  .controller('MainDetailsCtrl', function ($scope, $http, socket, schema) {
      $scope.schema = schema;

      $scope.$on('$destroy', function () {
          //socket.unsyncUpdates('schema');
      });
  });
