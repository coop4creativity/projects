// ============================================================================
// Project: Toolkit Angular
// Name/Class: 
// Created On: 14/Oct/2015
// Author: João Carreiro (joao.carreiro@cybermap.pt)
// Company: Cybermap Lda.
// Description:
// ============================================================================

"use strict";
angular.module('toolkit.charting').controller('tkChartBuilderController', [
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

        $scope.chart = {
            'name': '<Name>',
            'description': '<Description>',
            'spec': ''
        };

        $scope.source = null;

        $scope.type = 'PIE-CHART';
        $scope.x = null;
        $scope.y = null;

        $scope.propX = null;
        $scope.propY = null;

        $scope.entity = {};

        $scope.properties = [];

        $scope.entityList = {};

        $scope.toolbar = [];

        $scope.charType = [
            { id: 'PIE-CHART', name: 'Pie' },
            { id: 'PIE-CHART-3D', name: 'Pie (3D)' },
            { id: 'LINE-CHART', name: 'Linha' },
            { id: 'HISTOGRAM', name: 'Histograma' }
        ];


        $scope.resources =
            {
                toolbar: {
                    'saveText': 'Guardar',
                    'previewText': 'Pré-Visualizar',
                },
            };

        //
        // PROPERTIES
        //

        var _propertyGet = function (properties, name) {

            var property = null;

            if (toolkit.util.IsDefined(properties)) {

                $.each(properties, function (idx, elm) {

                    if (elm.name == name) {
                        property = elm;
                        return false;
                    }
                });
            }

            return property;
        }

        //
        // SCHEMAS
        //

        var _schema = {
            'default': 'DEFAULT',
            'create': 'CREATE',
            'view': 'VIEW',
            'edit': 'EDIT'
        }

        var _schemaSetup = function (entity) { };

        var _schemaGet = function (entity, type) {

            var schema = null;

            if (toolkit.util.IsDefined(entity.schemas)) {

                $.each(entity.schemas, function (idx, elm) {

                    if (elm.type == type) {
                        schema = elm;
                        return false;
                    }
                });
            }

            return schema;
        };

        var _schemaHas = function (entity, type) {

            return _schemaGet(entity, type) != null;
        }

        //
        // CALLBACKS
        //

        var _save = function () {

            var nameX;
            var nameY;
            var dnameX;
            var dnameY;

            if (toolkit.util.IsDefined($scope.propX)) {

                var x = _propertyGet($scope.properties, $scope.propX);
                nameX = x.name;
                dnameX = x.displayName;
            }

            if (toolkit.util.IsDefined($scope.propY)) {

                var y = _propertyGet($scope.properties, $scope.propY);
                nameY = y.name;
                dnameY = y.displayName;
            }

            $scope.chart.url = $scope.entity.api.list;
            $scope.chart.nameX = nameX;
            $scope.chart.nameY = nameY;
            $scope.chart.displayNameX = dnameX;
            $scope.chart.displayNameY = dnameY;
            $scope.chart.type = $scope.type;

            dal.create('chart/create')($scope.chart).then(function (output) { window.history.back(); }, error.display);
        }

        var _preview = function () {
        }

        //
        // TOOLBARS
        //

        var _toolbarSetup = function () {

            var buttonSave =
                {
                    kind: 'BUTTON',
                    label: 'Guardar',
                    thumbnail: 'plus',
                    type: 'default',
                    callback: _save,
                    where: 'left'
                };

            var buttonPreview =
                {
                    kind: 'BUTTON',
                    label: '',
                    thumbnail: 'refresh',
                    type: 'default',
                    callback: _updateChart,
                    where: 'right'
                };

            var toolbar = [];

            toolbar = [].concat(toolbar, buttonSave);
            toolbar = [].concat(toolbar, buttonPreview);

            //
            // Set current list toolbar. 
            //

            $scope.toolbar = toolbar;
        };

        //
        // CALLBACKS
        //

        var _changeSource = function () {

            ddl.getByID($scope.source).then(function (output) {

                if (toolkit.util.IsDefined(output) && toolkit.util.IsDefined(output.schemas) && _schemaHas(output, _schema.default)) {

                    $scope.entity = output;
                    $scope.properties = _schemaGet(output, _schema.default).properties;
                    $scope.propX = null;
                    $scope.propY = null;
                }

            }, error.display);
        }

        var _changeType = function () {
            _updateChart();
        }

        var _changeX = function () {
            _updateChart();
        }

        var _changeY = function () {
            _updateChart();
        }

        var _updateChart = function () {

            var nameX;
            var nameY;
            var dnameX;
            var dnameY;

            if (toolkit.util.IsDefined($scope.propX)) {

                var x = _propertyGet($scope.properties, $scope.propX);
                nameX = x.name;
                dnameX = x.displayName;
            }

            if (toolkit.util.IsDefined($scope.propY)) {

                var y = _propertyGet($scope.properties, $scope.propY);
                nameY = y.name;
                dnameY = y.displayName;
            }

            _drawChart($scope.chart.name, $scope.entity.api.list, nameX, nameY, dnameX, dnameY, $scope.type, 'chartContainer');

        }

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
        // SCOPE CALLBACKS
        //

        $scope.changeType = _changeType;
        $scope.changeSource = _changeSource;
        $scope.changeX = _changeX;
        $scope.changeY = _changeY;

        //
        // LOAD & REFRESH METHODS
        //

        var _load = function () {

            //
            // Setup toolbar.
            //

            _toolbarSetup();

            //
            // Get list of entities.
            //

            ddl.list().then(function (output) {

                //
                // Set the current data source object object.
                //

                $scope.entityList = output;
                $scope.source = output[0].id;
                _changeSource();

            }, error.display);
        };

        //
        // INIT
        //

        _load();
    }
]);
