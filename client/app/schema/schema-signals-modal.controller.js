'use strict';

angular.module('plantMimicApp')
  .controller('SchemaSignalsModalCtrl', function ($scope, signals, $modalInstance) {
    
    $scope.selectedSignals = [];
    $scope.signals = angular.copy(signals);
    $scope.signalNames = [];
    for (var i = 0; i < signals.length; i++) {
        $scope.signalNames.push({ id: signals[i]._id, value: signals[i].value });
    }

    $scope.signalsError = false;
   
    $scope.ok = function () {
        if ($scope.selectedSignals.length > 0 && !!$scope.name && $scope.name !== '') {
            $modalInstance.close({ name: $scope.name, signals: $scope.selectedSignals });
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
    
    $scope.onSignalSelect = function ($item) {
        var signal = findSignalById($scope.signals, $item.id);
        if (!!signal) {
            $scope.selectedSignals.push(signal);
            $scope.searchedSignal = '';

            $scope.signalsError = false;
        }
    };
    
    $scope.removeSignal = function (item) {
        $scope.selectedSignals.splice($scope.selectedSignals.indexOf(item), 1);
    };
    
    function findSignalById(signals, id) {
        for (var i = 0; i < signals.length; i++) {
            if (signals[i]._id === id) {
                return angular.copy(signals[i]);
            }
        }
        return null;
    };
});
