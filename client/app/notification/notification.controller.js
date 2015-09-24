'use strict';

angular.module('plantMimicApp')
  .controller('NotificationCtrl', function ($scope, notifications) {
    $scope.notifications = notifications.data;
});
