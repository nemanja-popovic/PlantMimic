'use strict';

angular.module('plantMimicApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
        id: '@_id'
    },
    {
        changePassword: {
            method: 'PUT',
            params: {
                controller: 'password'
            }
        },
        updateProfile: {
            method: 'PUT',
            params: {
                controller: 'profile'
            }
        },
        get: {
            method: 'GET',
            params: {
                id: 'me'
            }
        }
    });
});
