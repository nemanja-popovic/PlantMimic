'use strict';

angular.module('plantMimicApp')
  .controller('SchemaSignalsModalCtrl', function ($scope, signals, $modalInstance) {
    
    $scope.signals = [];
    $scope.signalsError = false;

    for (var i = 0; i < signals.length; i++) {
        $scope.signals.push({ value: signals[i] });
    }

    $scope.selectedItems = [];
    
    $scope.toggle = function (item) {

        item.selected = !item.selected;
        if (item.selected) {
            $scope.selectedItems.push(item.value);
            $scope.signalsError = false;
        }
        else {
            $scope.selectedItems.splice($scope.selectedItems.indexOf(item.value), 1);
        }
    };
    
    $scope.ok = function () {
        if ($scope.selectedItems.length > 0 && !!$scope.name && $scope.name !== '') {
            $modalInstance.close({ name: $scope.name, signals: $scope.selectedItems });
        }
        else {
            $scope.signalsError = true;
        }
    };
    
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});
