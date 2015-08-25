'use strict';

angular.module('plantMimicv1App')
  .controller('SchemaCtrl', function ($scope, Auth, Schema, Upload, schema, signals, $modal) {
    
    // Use the Schema $resource to fetch all users
    $scope.schema = schema;
    $scope.signals = signals.data || [];
    
    ////Do not put these two, grunt is complaining
    //$scope.newImageFilename;
    //$scope.file;
    
    $scope.addSchema = function () {
        if ($scope.schema.name && $scope.file !== null) {
            $scope.upload($scope.file);
            $scope.error = null;
        }
        else {
            $scope.error = 'Please provide all required fields';
        }
    };
    
    ////File upload
    //$scope.$watch('file', function () {
    //    if ($scope.file != null) {
    //        $scope.upload([$scope.file]);
    //    }
    //});
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
                console.log(data);
                $scope.schema.imageUrl = data;
                
                //Save schema and open page
                Schema.createSchema($scope.schema).$promise.then(function (res) {
                    console.log('created');
                    console.log(res);
                });
            });
        }
    };
    $scope.addPointToSchema = function (event) {
        
        //Show modal to add signals to this schema
        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: './app/schema/schema-signals-modal.html',
            controller: 'SchemaSignalsModalCtrl',
            resolve: {
                signals: function () {
                    return $scope.signals;
                }
            }
        });
        
        modalInstance.result.then(function (selectedItems) {
            $scope.schema.points.push({
                'signals': selectedItems,
                'x': event.offsetX,
                'y': event.offsetY,
            });
        }, function () {
            console.log('Modal dismissed at: ' + new Date());
        });

    };
});
