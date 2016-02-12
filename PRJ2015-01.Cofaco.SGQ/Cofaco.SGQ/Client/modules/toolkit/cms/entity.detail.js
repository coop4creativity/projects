
"use strict";
angular.module('toolkit.cms').controller('tkEntityDetailController', [
    '$scope',
    '$window',
    '$location',
    '$routeParams',
    'tkAuthService',
    'tkErrorService',
    'tkEntityConfigService',
    'tkEntityDDLService',
    'tkEntityDALService',
    function ($scope, $window, $location, $routeParams, tkAuthService, error, config, ddl, dal) {

        //
        // PROPERTY MANAGEMENT
        //

        var _addProperty = function () {

            var order = $scope.properties.length;
            $scope.properties.push({ caption: null, type: 'BOOL', order: order });
        };

        var _remProperty = function (order) {

            var index = _getIndex(order);

            $scope.properties.splice(index, 1);

            //
            // Reorder, start from 0
            //

            $.each($scope.properties, function (idx, property) { property.order = idx; });
        };

        var _upProperty = function (order) {

            if (order > 0) {

                var index0 = _getIndex(order);
                var index1 = _getIndex(order - 1);
                _swapOrders(index0, index1);
            }
        };

        var _downProperty = function (order) {

            if (order < $scope.properties.length) {

                var index0 = _getIndex(order);
                var index1 = _getIndex(order + 1);
                _swapOrders(index0, index1);
            }
        };

        var _swapOrders = function (index0, index1) {

            var orderIndex0 = $scope.properties[index0].order;
            $scope.properties[index0].order = $scope.properties[index1].order;
            $scope.properties[index1].order = orderIndex0;

        };

        var _getIndex = function (order) {

            var index = -1;
            $.each($scope.properties, function (idx, property) {

                if (order == property.order) {
                    index = idx;
                    return false;
                }
            });

            return index;
        }

        var _normalizeNames = function () {

            $.each($scope.properties, function (idx, property) {
                property.name = property.displayName.toLowerCase().replace(/ /, '_');
            });
        }

        $scope.addProperty = _addProperty;
        $scope.remProperty = _remProperty;
        $scope.upProperty = _upProperty;
        $scope.downProperty = _downProperty;

        //
        // TOOLBAR
        //

        $scope.toolbar = [];

        var _toolbar = function () {

            var list = [];

            var buttonSave =
                {
                    kind: 'BUTTON',
                    label: 'Guardar',
                    thumbnail: 'ok',
                    type: 'default',
                    callback: _save,
                    where: 'right'
                };

            var buttonCancel =
                {
                    kind: 'BUTTON',
                    label: 'Cancelar',
                    thumbnail: 'remove',
                    type: 'default',
                    callback: _cancel,
                    where: 'right'
                };

            var buttonRefresh =
                {
                    kind: 'BUTTON',
                    label: '',
                    thumbnail: 'refresh',
                    type: 'default',
                    callback: _refresh,
                    where: 'right'
                };

            list.push(buttonSave, buttonCancel, buttonRefresh);
            $scope.toolbar = list;
        };

        //
        // STATE
        //

        $scope.page = null;

        $scope.clusterRef = null;
        $scope.entityRef = null;
        $scope.op = null;

        $scope.cluster = null;
        $scope.entity = null;
        $scope.properties = [];
        $scope.types = [];

        var _parseArguments = function () {

            $scope.op = $routeParams.op.toUpperCase();

            switch ($scope.op) {

                case 'CREATE':
                    {
                        $scope.clusterRef = $routeParams.ref;
                    }
                    break;
                case 'VIEW':
                case 'UPDATE':
                    {
                        $scope.entityRef = $routeParams.ref;
                    } break;
            }
        };

        //
        // CALLBACKS
        //

        var _load = function () {

            //
            // load the arguments.
            //

            _parseArguments();

            //
            // Based on operation, load stuff.
            //

            if ($scope.op == 'CREATE') {

                //
                // load cluster.
                //

                if (angular.isDefined($scope.clusterRef)) {
                    ddl.cluster.get($scope.clusterRef).then(function (cluster) {

                        if (angular.isObject(cluster)) {
                            //
                            // Store cluster and set page header information.
                            //

                            $scope.cluster = cluster;
                            $scope.page = { icon: 'hdd', name: cluster.name, description: cluster.description };

                            //
                            // Load available types.
                            //

                            ddl.type.list().then(function (types) {

                                $scope.types = types;

                                //
                                // init over, run interface.
                                //

                                _refresh();

                            }, error.display);
                        }
                        else {

                            error.display('ERROR: No cluster definition found!');
                        }

                    }, error.display);
                }
                else {

                    //
                    // ERROR: cluster reference is mandatory.
                    //

                    error.display('INTERNAL ERROR: No cluster definition found!');
                }
            }
        };

        var _refresh = function () {

            _toolbar();
            _item();
        };

        var _item = function () {

            $scope.entity = {
                "ref": "",
                "visibility": "ACTIVE",
                "icon": "hdd",
                "name": "pessoa",
                "description": "pessoa - descrição",
                "api": {
                    "create": "storedal/create/{entity.ID}",
                    "detail": "entity/{entity.ID}",
                    "list": "storedal/list/{entity.ID}",
                    "update": "storedal/update/{entity.ID}",
                    "delete": "storedal/delete/{entity.ID}?key={item.ID}"
                },
                "views": [],
            };

            $scope.properties = [
                    {
                        "name": "",
                        "isKey": true,
                        "displayName": "Nome",
                        "description": "",
                        "type": "TEXT",
                        "required": true,
                        "editable": false
                    },
                    {
                        "name": "",
                        "displayName": "Morada",
                        "description": "",
                        "type": "TEXT-BLOCK",
                        "required": true,
                        "editable": false
                    },
                    {
                        "name": "",
                        "displayName": "Data de Nascimento",
                        "description": "",
                        "type": "DATETIME",
                        "required": true,
                        "editable": false
                    }
            ];
        };

        var _cancel = function () {
            $window.history.back();
        }

        var _save = function () {

            if ($scope.op == 'CREATE') {

                //
                // assemble entity.
                //                

                // $scope.entity.ref = $scope.entity.name;

                _normalizeNames();

                $scope.entity.schemas = [];

                var schemaDEFAULT = {
                    type: 'DEFAULT',
                    properties: $scope.properties
                };

                var schemaCREATE = {
                    type: 'CREATE',
                    properties: $scope.properties
                };

                var schemaEDIT = {
                    type: 'EDIT',
                    properties: $scope.properties
                };

                $scope.entity.schemas.push(schemaDEFAULT, schemaCREATE, schemaEDIT);

                //
                // Save
                //

                ddl.cluster.addEntity($scope.cluster.id, $scope.entity).then(function (output) {

                    $window.history.back();

                }, error.display);

            }
        }

        //
        // INIT
        //

        _load();
    }
]);
