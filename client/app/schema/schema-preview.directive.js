'use strict';

var addChartWithSignalsData = function addChartWithSignalsData(el, name, series) {
    
    var $newItem = angular.element(el);
    if (!$newItem) {
        return;
    }
    $newItem.each(function () {
        angular.element(this).highcharts({
            chart: {
                type: 'spline',
                animation: window.Highcharts.svg, // don't animate in old IE
                marginRight: 10
            },
            title: {
                text: name
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 50
            },
            yAxis: {
                title: {
                    text: 'Value'
                },
                plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
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

angular.module('plantMimicv1App')
    .directive('schemaPreview', function () {
    return {
        restrict: 'AE', 
        scope: {
            schema: '=schema'
        },
        controller: ['$scope', 'socket', function ($scope, socket) {
                // Update array with any new or deleted items pushed from the socket
                socket.syncUpdates('point', $scope.schema.points, function (event, point, points) {
                    // This callback is fired after the comments array is updated by the socket listeners
                    console.log(points);
                    
                    //Update highcharts
                    for (var i = 0; i < window.Highcharts.charts.length; i++) {
                        var positionOfSignal = getPositionOfSignal(window.Highcharts.charts[i], point.signal);
                        if (positionOfSignal > -1) {
                            
                            var x = (new Date()).getTime(), // current time
                                y = point.value;
                            window.Highcharts.charts[i].series[positionOfSignal].addPoint([x, y], true, true);
                        }
                    }

                });
            }],
        templateUrl: 'app/schema/schema-preview.html',
        replace: true,
        link: function (scope, element) {
            
            var wrapper = element;
            
            for (var i = 0; i < scope.schema.points.length; i++) {
                
                var x = scope.schema.points[i].x;
                var y = scope.schema.points[i].y;
                var id = 'tooltop-' + i;
                var content = '<div class="signal">' +
                                    '<div id="' + id + '" class="lineChart chart"></div>' +
                                '</div>';
                
                // append tooltip
                wrapper.append('<div style="left:' + x + '%;top:' + y + '%" class="tooltip-down">' +
                                            '<div class="tooltip"><div class="close-tooltip">X</div>' + content + '</div>' +
                                    '</div>');
                if (scope.schema.points[i].signals.length > 0) {
                    var points = scope.schema.points[i];
                    //Fire up highcharts
                    var series = [];
                    for (var j = 0; j < points.signals.length; j++) {
                        series.push({ name: points.signals[j], data: getRandomData() });
                    }
                    
                    var el = element.find('#' + id);
                    addChartWithSignalsData(el, scope.schema.points[i].name, series);
                }
            }
            
            
            //Resize all charts
            for (i = 0; i < window.Highcharts.charts.length; i++) {
                if (!!window.Highcharts.charts[i]) {
                    window.Highcharts.charts[i].reflow();
                }
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
