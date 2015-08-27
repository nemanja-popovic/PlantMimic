'use strict';

angular.module('plantMimicv1App')
  .controller('SchemaCtrl', function ($scope, Auth, Schema, Upload, schema, signals, $modal, $state) {
    
    $scope.schema = schema;
    $scope.signals = signals.data || [];
    
    ////Do not put these two, grunt is complaining
    //$scope.newImageFilename;
    //$scope.file;
    
    $scope.addSchema = function () {
        if (!!$scope.schema.name && !!$scope.file) {
            $scope.upload($scope.file);
            $scope.error = null;
        }
        else {
            $scope.error = 'Please provide all required fields';
        }
    };
    
    $scope.upload = function (file) {
        if (!file.$error) {
            Upload.upload({
                url: '/api/schema/image',
                file: file
            }).progress(function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                $scope.log = 'progress: ' + progressPercentage + '% ' +
                                evt.config.file.name + '\n' + $scope.log;
            }).success(function (data) {
                
                //Save result of data
                $scope.schema.imageUrl = data;
                
                //Save schema and open page
                Schema.createSchema($scope.schema).$promise.then(function (res) {
                    //Navigate to all schemas
                    $state.go('schemas');
                    //$state.go('schema', { id: res._id });
                });
            });
        }
    };
    $scope.addPointToSchema = function (event) {
        
        var $img = angular.element('#schemaImage');
        var width = $img.width();
        var height = $img.height();
        // event.offsetX : x = width : 100
        var x = (event.offsetX * 100) / width;
        var y = (event.offsetY * 100) / height; 

        //Show modal to add signals to this schema
        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'app/schema/schema-signals-modal.html',
            controller: 'SchemaSignalsModalCtrl',
            resolve: {
                signals: function () {
                    return $scope.signals;
                }
            }
        });
        
        modalInstance.result.then(function (res) {
            $scope.schema.points.push({
                'name': res.name,
                'signals': res.signals,
                'x': x,
                'y': y,
            });
        }, function () {
        });

    };
});
