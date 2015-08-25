'use strict';

angular.module('plantMimicv1App')
  .controller('SchemasCtrl', function ($scope, Auth, Schema, schemas) {
    
    $scope.schemas = schemas;
    
    $scope.delete = function (schema) {
        Schema.deleteSchema({ id: schema._id });
        angular.forEach($scope.schemas, function (u, i) {
            if (u === schema) {
                $scope.schemas.splice(i, 1);
            }
        });
    };
    
});
