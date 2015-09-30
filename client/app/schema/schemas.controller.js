'use strict';

angular.module('plantMimicApp')
  .controller('SchemasCtrl', ['$scope', 'Auth', 'Schema', 'schemas', 'Modal', function ($scope, Auth, Schema, schemas, Modal) {
        
        $scope.schemas = schemas;
        
        $scope.delete = function (schema) {
            Modal.confirm.delete(function () {
                Schema.deleteSchema({ id: schema._id });
                angular.forEach($scope.schemas, function (u, i) {
                    if (u === schema) {
                        $scope.schemas.splice(i, 1);
                    }
                });
            })(schema.name);
        };
        

    }]);
