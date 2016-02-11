
'use strict';
app.controller('process-schema-view-controller', [
    '$scope',
    '$location',
    '$routeParams',
    'tkAuthService',
    'tkErrorService',
    'client',
    function ($scope, $location, $routeParams, tkAuthService, error, client) {

        //
        // CONFIG
        //

        $scope.config = {

            //
            // Form header.
            //

            header: {
                name: 'Registo (Processo)',
                icon: 'hdd',
                description: 'Visualização de um registo de processo'
            },

            //
            // API for item value.
            //

            api: client.process,

            //
            // User messages.
            //

            msgs: {
                success: {
                    create: 'Item criado com sucesso',
                    edit: 'As suas alterações foram guardadas com sucesso'
                },
                error: {
                    create: 'Não foi possivel criar o item, por favor tente de novo',
                    edit: 'Não foi possivel guardar as suas alterações, por favor tente de novo'
                }
            },

            //
            // Item value object.
            //

            item: {

                title: '',
                description: '',
                properties: []
            },

            //
            // Init handler.
            //

            init: function () {

                $scope.types = [];
                $scope.config.api.types.list().then(function (result) { $scope.types = result; }, function (err) { alert(err); });
            }
        };

        //
        // TOOLBAR
        //

        $scope.toolbar = [];

        var _toolbar = function () {

            var list = [];      

            var buttonRefresh =
                {
                    kind: 'BUTTON',
                    label: '',
                    thumbnail: 'refresh',
                    type: 'default',
                    callback: _refresh,
                    where: 'right'
                };

            list.push(buttonRefresh);
            $scope.toolbar = list;
        };

        //
        // ARGUMENTS
        //

        $scope.id = null;

        var _parseArguments = function () {

            $scope.id = $routeParams.id;
        };

        //
        // CALLBACKS
        //

        var _load = function () {

            $scope.item = $scope.config.item;
            $scope.page = $scope.config.header;
            $scope.config.init();

            _parseArguments();
            _refresh();
        };

        var _refresh = function () {

            _toolbar();
            _item();
        };

        var _item = function () {

            if (angular.isDefined($scope.id)) {
                $scope.config.api.ddl.get($scope.id).then(function (result) {

                    $scope.item = result;

                }, function (err) { alert(err); });
            }
        };

        var _cancel = function () {

            _refresh();
        }

        var _save = function () {

            var promise = $scope.config.api.ddl.update($scope.item);

            promise.then(function (result) {

                alert($scope.config.msgs.success.edit);
                _refresh();

            }, function (err) {

                alert($scope.config.msgs.error.edit);
                // alert(JSON.stringify(err));
            });
        }

        //
        // INIT
        //

        _load();
    }
]);
