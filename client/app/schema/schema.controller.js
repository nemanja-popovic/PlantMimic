﻿'use strict';

angular.module('plantMimicApp')
  .controller('SchemaCtrl', function ($scope, Auth, Schema, Upload, schema, signals, $modal, $state, toaster) {
    
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
    
    $scope.updateSchema = function () {
        //Save schema and open page
        console.log($scope.schema);
        debugger;
        Schema.updateSchema({ id: $scope.schema._id }, $scope.schema).$promise.then(function () {
            //Navigate to all schemas
            $state.go('schemas');
            
            //Show notification that schema has been added successfully
            toaster.pop('success', 'Schema updated!', 'Schema ' + $scope.schema.name + 'successfully updated!');
        });
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
                Schema.createSchema($scope.schema).$promise.then(function () {
                    //Navigate to all schemas
                    $state.go('schemas');

                    //Show notification that schema has been added successfully
                    toaster.pop('success', 'Schema added!', 'Schema ' + $scope.schema.name + 'successfully added!');
                });
            }).error(function (data) {
                console.log('error status: ' + data);
                toaster.pop('error', 'Upload failed!', 'Upload of file: ' + file + 'failed. Please try again.');
            });
        }
    };
    $scope.addPointToSchema = function (event, elementId) {
        var $img = angular.element('#' + elementId);
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
                'id': guidGenerator()
            });
        }, function () {
        });

    };

    function guidGenerator() {
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
    }

});
