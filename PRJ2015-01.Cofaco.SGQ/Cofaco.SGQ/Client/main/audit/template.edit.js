
'use strict';
app.controller('audit-template-edit-controller', [
    '$scope',
    '$location',
    '$routeParams',
    'tkAuthService',
    'tkErrorService',
    'client',
    function ($scope, $location, $routeParams, tkAuthService, error, client) {

        //
        // QUESTIONS
        //

        var _addQuestion = function () {

            var order = $scope.item.questions.length;
            $scope.item.questions.push({ caption: null, type: 'BOOL', order: order });
        };

        var _remQuestion = function (order) {

            var index = _getIndex(order);

            $scope.item.questions.splice(index, 1);

            //
            // Reorder, start from 0
            //

            $.each($scope.item.questions, function (idx, question) { question.order = idx; });
        };

        var _upQuestion = function (order) {

            if (order > 0) {

                var index0 = _getIndex(order);
                var index1 = _getIndex(order - 1);
                _swapOrders(index0, index1);
            }
        };

        var _downQuestion = function (order) {

            if (order < $scope.item.questions.length) {

                var index0 = _getIndex(order);
                var index1 = _getIndex(order + 1);
                _swapOrders(index0, index1);
            }
        };

        var _swapOrders = function (index0, index1) {

            var orderIndex0 = $scope.item.questions[index0].order;
            $scope.item.questions[index0].order = $scope.item.questions[index1].order;
            $scope.item.questions[index1].order = orderIndex0;

        };

        var _getIndex = function (order) {

            var index = -1;
            $.each($scope.item.questions, function (idx, question) {

                if (order == question.order) {
                    index = idx;
                    return false;
                }
            });

            return index;
        }

        $scope.addQuestion = _addQuestion;
        $scope.remQuestion = _remQuestion;
        $scope.upQuestion = _upQuestion;
        $scope.downQuestion = _downQuestion;

        //
        // CONFIG
        //

        $scope.config = {

            //
            // Form header.
            //

            header: {
                name: 'Auditoria (Template)',
                icon: 'star',
                description: 'Edição de um formulário de auditoria'
            },

            //
            // API for item value.
            //

            api: client.audit,

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
                questions: []
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
                $scope.config.api.template.get($scope.id).then(function (result) {

                    $scope.item = $.extend(true, $scope.config.item, result);

                }, function (err) { alert(err); });
            }
        };

        var _cancel = function () {

            _refresh();
        }

        var _save = function () {

            var promise = $scope.config.api.template.update($scope.item);

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
