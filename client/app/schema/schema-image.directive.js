'use strict';

angular.module('plantMimicApp')
    .directive('schemaImage', function () {
        return {
            restrict: 'E',
            scope: {
                file: '=file',
                points: '=points'
            },
            template: '<div class="schema-image schema-wrapper" ng-transclude></div>',
            transclude: true,
            link: function (scope, element) {

                console.log(element);
                var wrapper = element.find('.schema-wrapper');

                scope.$watch('points', function (newVal, oldVal) {

                    if (scope.points.length > 0 && newVal.length !== oldVal.length) {
                        //Add or remove pin based on change?
                        var i = newVal.length - 1;
                        var x = scope.points[i].x;
                        var y = scope.points[i].y;
                        var content = '<h1>Signals</h1><ul class="list-group">';
                        var points = scope.points[i];
                        var signalsLength = points.signals.length;
                        for (var j = 0; j < signalsLength; j++) {
                            content += '<li class="list-group-item">' + points.signals[j] + '</li>';
                        }
                        content += '</ul>';

                        // append the tooltip
                        wrapper.append('<div style="left:' + x + '%;top:' + y + '%" class="tooltip-down">' +
                                                '<div class="tooltip"><div class="close-tooltip">X</div>' + content + '</div>' +
                                        '</div>');
                    }
                }, true);

                var imgEl = element.find('img');
                // set the wrapper width and height to match the img size
                element.css({
                    'width': imgEl.width(),
                    'height': imgEl.height()
                });

                for (var i = 0; i < scope.points.length; i++) {
                    var x = scope.points[i].x;
                    var y = scope.points[i].y;
                    var content = '<h1>Signals</h1><ul class="list-group">';
                    var points = scope.points[i];
                    var signalsLength = points.signals.length;
                    for (var j = 0; j < signalsLength; j++) {
                        content += '<li class="list-group-item">' + points.signals[j] + '</li>';
                    }
                    content += '</ul>';

                    // append tooltip
                    wrapper.append('<div style="left:' + x + '%;top:' + y + '%" class="tooltip-down">' +
                                                '<div class="tooltip"><div class="close-tooltip">X</div>' + content + '</div>' +
                                        '</div>');
                }

                wrapper.on('click', '.tooltip-up, .tooltip-down', function () {
                    angular.element(this).children('.tooltip').fadeIn(100);
                });
                wrapper.on('click', '.close-tooltip', function (e) {
                    e.stopPropagation();
                    angular.element(this).parent('.tooltip').fadeOut(100);
                });
            }
        };
    });
