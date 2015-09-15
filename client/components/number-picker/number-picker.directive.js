'use strict';

var template = '<div class="number-picker">' +
                    '<label>{{name}}</label>' +
                    '<div class="text-center">' +
                        '<a ng-click="incrementValue($event)"' +
                            'class="btn btn-link">' +
                            '<span class="glyphicon glyphicon-chevron-up"></span>' +
                        '</a>' +
                    '</div>' +
                    '<div class="form-group">' +
                        '<input style="width:50px;" type="text" ng-model="value"' +
                            'class="form-control text-center" ng-readonly="::readonlyInput">' +
                    '</div>' +
                    '<div class="text-center">' +
                        '<a ng-click="decrementValue($event)"' +
                            'class="btn btn-link">' +
                            '<span class="glyphicon glyphicon-chevron-down"></span>' +
                        '</a>' +
                    '</div>' +
                '</div>';

angular.module('plantMimicApp')
.directive('numberPicker', function () {
    return {
        restrict: 'AE', 
        scope: {
            value: '=value',
            name: '=name'
        },
        controller: ['$scope', function ($scope) {
                
                if (!$scope.value) {
                    $scope.value = 0;
                }
                
                $scope.incrementValue = function (e) {
                    e.stopPropagation();
                    $scope.value++;
                };
                
                $scope.decrementValue = function (e) {
                    e.stopPropagation();
                    $scope.value--;
                };

            }],
        // templateUrl: 'client/components/number-picker/number-picker.html'
        template: template
    };
});
