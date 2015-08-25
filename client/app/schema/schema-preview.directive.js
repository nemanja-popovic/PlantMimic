'use strict';

var addPieChartWithCarShares = function addPieChartWithCarShares(el, series) {
    
    var $newItem = angular.element(el);
    if (!$newItem) {
        return;
    }
    $newItem.each(function () {
        angular.element(this).highcharts({
            title: {
                text: 'Monthly Average Temperature',
                x: -20 //center
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
                valueSuffix: 'V'
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
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

angular.module('plantMimicv1App')
    .directive('schemaPreview', function () {
    return {
        restrict: 'AE', 
        scope: {
            schema: '=schema'
        },
        templateUrl: './app/schema/schema-preview.html',
        replace: true,
        link: function (scope, element) {
            
            var wrapper = element;
            console.log(element);
            
            for (var i = 0; i < scope.schema.points.length; i++) {
                
                var x = scope.schema.points[i].x;
                var y = scope.schema.points[i].y;
                var id = 'tooltop-' + x + '_' + y;
                var content = '<div class="signal">' +
                                    '<div id="' + id + '" class="lineChart chart"></div>' +
                                '</div>';
                
                // append tooltip
                wrapper.append('<div style="left:' + x + 'px;top:' + y + 'px" class="tooltip-down">' +
                                            '<div class="tooltip"><div class="close-tooltip">X</div>' + content + '</div>' +
                                    '</div>');
                if (scope.schema.points[i].signals.length > 0) {
                    var points = scope.schema.points[i];
                    //Fire up highcharts
                    var series = [];
                    for (var j = 0; j < points.signals.length; j++) {
                        series.push({ name: points.signals[j] });
                    }
                    
                    var el = element.find('#' + id);
                    console.log(el);
                    addPieChartWithCarShares(el, series);
                }
            }
            
            
            //Resize all charts
            for (i = 0; i < window.Highcharts.charts.length; i++) {
                if (!!window.Highcharts.charts[i]) {
                    window.Highcharts.charts[i].reflow();
                }
            }
            
            //wrapper.on('mouseenter', '.tooltip-up, .tooltip-down', function () {
            //    angular.element(this).children('.tooltip').fadeIn(100);
            //});
            //wrapper.on('mouseleave', '.tooltip-up, .tooltip-down', function () {
            //    angular.element(this).children('.tooltip').fadeOut(100);
            //});
            
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
