'use strict';

angular.module('plantMimicv1App')
  .factory('SchemaREST', function ($resource) {
    return $resource('/api/schema/:id', null,
    {
        'update': { method: 'PUT' },
        'add': {
            method: 'POST', 
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }
    });
});
