'use strict';

angular.module('plantMimicApp')
  .factory('MetricREST', function ($resource) {
    return $resource('/api/metric/:id', null, {});
});
