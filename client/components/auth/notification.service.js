'use strict';

angular.module('plantMimicApp')
  .factory('Notification', function Notification($http) {
   
    return {
        getNotifications: function (){
            return $http.get('/api/notification');
        } 
    };
});
