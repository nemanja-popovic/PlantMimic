'use strict';

angular.module('plantMimicApp')
  .factory('MetricSvc', function Schema(MetricREST) {
    
    var getMetric = function getMetric() {
        return MetricREST.get();
    };
    
    return {
        getMetric: getMetric
    };
});
