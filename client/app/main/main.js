'use strict';

angular.module('plantMimicv1App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        resolve: {
            schemas: ['Schema', function (Schema) {
                    return Schema.getSchemas().$promise;
                }]
        }
    })
      .state('main.details', {
        url: 'details/:id',
        templateUrl: 'app/main/main-details.html',
        controller: 'MainDetailsCtrl',
        resolve: {
            schema: ['Schema', '$stateParams', function (Schema, $stateParams) {
                    return Schema.getSchema({ id: $stateParams.id }).$promise;
                }],
        }
    });
});