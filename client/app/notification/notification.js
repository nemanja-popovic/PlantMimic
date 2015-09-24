'use strict';

angular.module('plantMimicApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('notifications', {
        url: '/notifications',
        templateUrl: 'app/notification/notification.html',
        controller: 'NotificationCtrl',
        authenticate: true,
        resolve: {
            notifications: ['Notification', function (Notification) {
                    return Notification.getNotifications();
                }]
        },
    });
});