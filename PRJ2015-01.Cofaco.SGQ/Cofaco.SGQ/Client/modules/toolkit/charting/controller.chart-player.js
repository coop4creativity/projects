// ============================================================================
// Project: Toolkit Angular
// Name/Class: 
// Created On: 14/Oct/2015
// Author: João Carreiro (joao.carreiro@cybermap.pt)
// Company: Cybermap Lda.
// Description:
// ============================================================================

(function () {
    "use strict";

    angular.module('toolkit.charting').controller('tkChartPlayerController', [
        '$scope',
        '$location',
        '$routeParams',
        'tkAuthService',
        'tkErrorService',
        'tkEntityConfigService',
        'tkEntityDDLService',
        'tkEntityDALService',

        function ($scope, $location, $routeParams, tkAuthService, error, config, ddl, dal) {

            //
            // SCOPE
            //

            $scope.chart = {};

            //
            // --TEMP--
            //

            var _drawChart = function (title, url, nameX, nameY, dnameX, dnameY, type, container) {

                if (toolkit.util.AreDefined(title, url, nameX, nameY, dnameX, dnameY, type, container)) {

                    dal.direct.list(url).then(function (list) {

                        var listData = [];

                        listData.push([dnameX, dnameY]);

                        $.each(list, function (idx, item) {

                            var valueX = item[nameX];
                            var valueY = item[nameY];

                            listData.push([valueX, valueY]);
                        });

                        var data = google.visualization.arrayToDataTable(listData);

                        var options = { title: title };

                        var chart = null;

                        switch (type) {

                            case 'PIE-CHART':
                                {
                                    var chart = new google.visualization.PieChart(document.getElementById(container));
                                }
                                break;
                            case 'PIE-CHART-3D':
                                {
                                    var chart = new google.visualization.PieChart(document.getElementById(container));
                                    options.is3D = true;
                                }
                                break;
                            case 'LINE-CHART':
                                {
                                    var chart = new google.visualization.LineChart(document.getElementById(container));
                                }
                                break;
                            case 'HISTOGRAM':
                                {
                                    var chart = new google.visualization.Histogram(document.getElementById(container));
                                }
                                break;
                        }

                        if (toolkit.util.IsDefined(chart)) {

                            chart.draw(data, options);
                        }

                    }, error.display);
                }
            }

            //
            // LOAD 
            //

            var _load = function () {

                var chartID = $routeParams.id;

                if (toolkit.util.IsDefined(chartID)) {

                    //
                    // Get the chart.
                    //

                    dal.direct.get('chart/get', chartID).then(function (output) {

                        if (toolkit.util.IsDefined(output)) {

                            $scope.chart = output;
                            _drawChart(output.name, output.url, output.nameX, output.nameY, output.displayNameX, output.displayNameY, output.type, 'chart');
                        }

                    }, error.display);
                }
            };

            //
            // INIT
            //

            _load();

        }]);
}());