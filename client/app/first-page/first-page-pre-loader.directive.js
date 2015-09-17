'use strict';

angular.module('plantMimicApp')
    .directive('preLoader', function () {
    return {
        restrict: 'A',
        link: function ($window) {
            
            // fade loading animation
            angular.element("#object").delay(600).fadeOut(300);
            // fade loading background					
            angular.element("#loading").delay(1000).fadeOut(500);
        }
    }
});
