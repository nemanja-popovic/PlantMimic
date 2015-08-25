'use strict';

angular.module('plantMimicv1App')
  .controller('SchemaSignalsModalCtrl', function ($scope, signals, $modalInstance) {
    
    $scope.signals = [];
    for (var i = 0; i < signals.length; i++) {
        $scope.signals.push({ value: signals[i] });
    }

    $scope.selectedItems = [];
    
    $scope.toggle = function (item) {

        item.selected = !item.selected;
        if (item.selected) {
            $scope.selectedItems.push(item.value);
        }
        else {
            $scope.selectedItems.splice($scope.selectedItems.indexOf(item.value), 1);
        }
    };
    
    $scope.ok = function () {
        $modalInstance.close($scope.selectedItems);
    };
    
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});
