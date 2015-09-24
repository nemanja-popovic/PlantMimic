'use strict';

var addChartWithSignalsData = function addChartWithSignalsData(el, points, series) {
    
    var $newItem = angular.element(el);
    if (!$newItem) {
        return;
    }
    $newItem.each(function () {
        
        var $element = angular.element(this);
        
        var plotLines = [];
        for (var i = 0; i < points.signals.length; i++) {
            plotLines.push({
                value: points.signals[i].max,
                color: 'green',
                dashStyle: 'shortdash',
                width: 2,
                label: {
                    text: 'Maximum ' + points.signals[i].value
                }
            });
            plotLines.push({
                value: points.signals[i].min,
                color: 'red',
                dashStyle: 'shortdash',
                width: 2,
                label: {
                    text: 'Minimum ' + points.signals[i].value
                }
            });
        }
        
        $element.highcharts({
            chart: {
                type: 'spline',
                animation: window.Highcharts.svg, // don't animate in old IE
                marginRight: 10
            },
            title: {
                text: points.name
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 50
            },
            yAxis: {
                title: {
                    text: 'Value'
                },
                plotLines: plotLines,
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                window.Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                window.Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: series
        });
        
        $element.highcharts().reflow();
    });
    
    ////Show loading animation
    //var chart = $newItem.highcharts();
    //chart.showLoading();
    
    ////Get carshares
    //$.get('/api/carshare', {}, function (data) {
    //    //Update this cart
    //    updatePieChartWithCarShares(chart, data);
    //    //Remove loading animation
    //    chart.hideLoading();
    //});
    //function updatePieChartWithCarShares(chart, obj) {
    //    chart.series[0].setData(obj.data);
    //}
};

function getPositionOfSignal(chart, name) {
    for (var i = 0; i < chart.series.length; i++) {
        if (chart.series[i].name === name) {
            return i;
        }
    }
    return -1;
}
function getRandomData() {
    // generate an array of random data
    var data = [],
        time = (new Date()).getTime(),
        i;
    
    for (i = -19; i <= 0; i += 1) {
        data.push({
            x: time + i * 1000,
            y: Math.floor(Math.random() * (30 - 0 + 1))
        });
    }
    return data;
}

function checkSignalMinAndMax(points, toaster, value) {
    
    for (var i = 0; i < points.length; i++) {
        
        var $statusElement = angular.element('#points-' + points[i].id);
        
        for (var j = 0; j < points[i].signals.length; j++) {
            
            var $signalElement = $statusElement.find('#point-signal-' + points[i].signals[j].value);
            //Apply class to show if value is inside min,max
            if (value > points[i].signals[j].max) {
                $signalElement.addClass('status_bad');
                
                //Show alert message and etc
                toaster.pop('error', 'Signal value too high!', points[i].signals[j].value + ' value: ' + value + ' is bigger than maximum allowed value of ' + points[i].signals[j].max);
            }
            else if (value < points[i].signals[j].min) {
                $signalElement.addClass('status_bad');
                
                //Show alert message and etc
                toaster.pop('error', 'Signal value too low!', points[i].signals[j].value + ' value: ' + value + ' is lower than minimum allowed value of ' + points[i].signals[j].min);
            }
            else {
                $signalElement.removeClass('status_bad');
            }
        }
    }
}

angular.module('plantMimicApp')
    .directive('schemaPreview', function () {
    return {
        restrict: 'AE', 
        scope: {
            schema: '=schema'
        },
        controller: ['$scope', 'socket', 'toaster', function ($scope, socket, toaster) {
                var i = 0;
                var pointsArray = angular.copy($scope.schema.points);
                
                // Update array with any new or deleted items pushed from the socket
                socket.syncUpdates('point', pointsArray, function (event, point/*, points*/) {
                    // This callback is fired after the comments array is updated by the socket listeners
                    //console.log(point);
                    
                    var y = 0;
                    //Update highcharts
                    for (i = 0; i < window.Highcharts.charts.length; i++) {
                        var positionOfSignal = getPositionOfSignal(window.Highcharts.charts[i], point.signal);
                        if (positionOfSignal > -1) {
                            
                            var x = (new Date()).getTime(); // current time
                            y = point.value;
                            window.Highcharts.charts[i].series[positionOfSignal].addPoint([x, y], true, true);
                            
                            checkSignalMinAndMax($scope.schema.points, toaster, point.value);
                        }
                    }
                 

                });
                
                $scope.$on('$destroy', function () {
                    socket.unsyncUpdates('point');
                    
                    //Remove highcharts
                    angular.element('.lineChart').remove();
                    
                    //window.Highcharts.charts = [];
                    //Leave last 5 elements for now?????
                    window.Highcharts.charts = window.Highcharts.charts.slice(Math.max(window.Highcharts.charts.length - 5, 1));
                });
            }],
        templateUrl: 'app/schema/schema-preview.html',
        replace: true,
        link: function (scope, element) {
            var j = 0;
            var points = [];
            
            var wrapper = element;
            
            for (var i = 0; i < scope.schema.points.length; i++) {
                
                var x = scope.schema.points[i].x;
                var y = scope.schema.points[i].y;
                var id = 'tooltop-' + scope.schema.points[i].id;
                var content = '<div class="signal">' +
                                    '<div id="' + id + '" class="lineChart chart"></div>' +
                                '</div>';
                
                var pointElements = '';
                if (scope.schema.points[i].signals.length > 0) {
                    points = scope.schema.points[i];
                    for (j = 0; j < points.signals.length; j++) {
                        pointElements += '<div id="point-signal-' + points.signals[j].value + '" class="point-element status_ok"></div>';
                    }
                }
                
                // append tooltip
                wrapper.append('<div id="points-' + scope.schema.points[i].id + '" style="left:' + x + '%;top:' + y + '%" class="point-elements">' +
                                             pointElements +
                                            '<div class="tooltip"><div class="close-tooltip">X</div>' + content + '</div>' +
                                    '</div>');
                if (scope.schema.points[i].signals.length > 0) {
                    points = scope.schema.points[i];
                    
                    //Fire up highcharts
                    var series = [];
                    for (j = 0; j < points.signals.length; j++) {
                        series.push({ name: points.signals[j].value, data: getRandomData() });
                    }
                    
                    var el = element.find('#' + id);
                    addChartWithSignalsData(el, points, series);
                }
            }
            
            wrapper.on('click', '.point-elements', function () {
                angular.element(this).children('.tooltip').fadeIn({
                    start: function () {
                        var tooltip = angular.element(this);
                        var position = tooltip.parent().offset();
                        
                        if (position.top < 300) {
                            tooltip.css('top', position.top - 300);
                        }
                        if ((angular.element('body').width() - position.left) < 300) {
                            tooltip.css('right', 0);
                            tooltip.css('left', 'auto');
                        }
                    },
                    duration: 100
                });
            });
            wrapper.on('click', '.close-tooltip', function (e) {
                e.stopPropagation();
                angular.element(this).parent('.tooltip').fadeOut(100);
            });
            
        }
    };
});