'use strict';

angular.module('plantMimicv1App')
  .config(function ($stateProvider) {
    $stateProvider
    .state('schemas', {
        url: '/schema',
        templateUrl: 'app/schema/schemas.html',
        controller: 'SchemasCtrl',
        resolve: {
            schemas: ['Schema', function (Schema) {
                    return Schema.getSchemas().$promise;
                }]
        }
    })
     .state('schema', {
        url: '/schema/:id',
        templateUrl: 'app/schema/schema.html',
        controller: 'SchemaCtrl',
        resolve: {
            schema: ['Schema', '$stateParams', function (Schema, $stateParams) {
                    if ($stateParams.id === 'new') {
                        return {
                            points: []
                        };
                    }
                    else {
                        return Schema.getSchema({ id: $stateParams.id }).$promise;
                    }
                }],
            signals: ['$http', function ($http) {
                    //For now empty array is returned
                    return $http.get('/api/signal');
                }]
        }
    });
});