﻿'use strict';

angular.module('plantMimicv1App')
  .controller('MainDetailsCtrl', function ($scope, $http, socket, schema) {
      $scope.schema = schema;

      //$http.get('/api/schema').success(function (schemas) {
      //    $scope.schemas = schemas;
      //    socket.syncUpdates('schema', $scope.schemas);
      //});

      $scope.$on('$destroy', function () {
          //socket.unsyncUpdates('schema');
      });
  });