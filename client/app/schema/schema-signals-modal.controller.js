'use strict';

angular.module('plantMimicApp')
  .controller('SchemaSignalsModalCtrl', function ($scope, signals, $modalInstance) {
    
    $scope.signals = angular.copy(signals);
    $scope.signalsError = false;
    
    $scope.selectedItems = [];
    
    $scope.toggle = function (item) {
        
        item.selected = !item.selected;
        if (item.selected) {
            $scope.selectedItems.push(item);
            $scope.signalsError = false;
        }
        else {
            for (var i = 0; i < $scope.selectedItems.length; i++) {
                if ($scope.selectedItems[i].value === item.value) {
                    $scope.selectedItems.splice(i, 1);
                }
            }
        }
    };
    
    $scope.ok = function () {
        if ($scope.selectedItems.length > 0 && !!$scope.name && $scope.name !== '') {
            $modalInstance.close({ name: $scope.name, signals: $scope.selectedItems });
            //Return to original settings
            $scope.signals = angular.copy(signals);
        }
        else {
            $scope.signalsError = true;
        }
    };
    
    $scope.cancel = function () {
        //Return to original settings
        $scope.signals = angular.copy(signals);
        //Close modal
        $modalInstance.dismiss('cancel');
    };
});
