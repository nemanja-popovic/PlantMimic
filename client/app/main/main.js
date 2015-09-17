'use strict';

angular.module('plantMimicApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/main',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        resolve: {
            schemas: ['Schema', function (Schema) {
                    return Schema.getSchemas().$promise;
                }],
            projectMetrics: ['MetricSvc', function (MetricSvc) {
                    return MetricSvc.getMetric().$promise;
                }]
        },
        authenticate: true
    })
      .state('main.details', {
        url: '/details/:id',
        templateUrl: 'app/main/main-details.html',
        controller: 'MainDetailsCtrl',
        resolve: {
            schema: ['Schema', '$stateParams', function (Schema, $stateParams) {
                    return Schema.getSchema({ id: $stateParams.id }).$promise;
                }],
        },
        authenticate: true
    });
});