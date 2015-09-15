'use strict';

angular.module('plantMimicApp')
 .controller('MasterCtrl', ['$scope', '$cookieStore', 'Auth', function MasterCtrl($scope, $cookieStore, Auth) {
        
        
        $scope.isAdmin = Auth.isAdmin;
        
        
        /**
         * Sidebar Toggle & Cookie Control
         */
        var mobileView = 992;
        
        $scope.getWidth = function () {
            return window.innerWidth;
        };
        
        $scope.$watch($scope.getWidth, function (newValue) {
            if (newValue >= mobileView) {
                if (angular.isDefined($cookieStore.get('toggle'))) {
                    $scope.toggle = !$cookieStore.get('toggle') ? false : true;
                } else {
                    $scope.toggle = true;
                }
            } else {
                $scope.toggle = false;
            }

        });
        
        $scope.toggleSidebar = function () {
            $scope.toggle = !$scope.toggle;
            $cookieStore.put('toggle', $scope.toggle);
        };
        
        window.onresize = function () {
            $scope.$apply();
        };
    }]);
