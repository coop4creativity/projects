// ============================================================================
// Project: Toolkit Angular
// Name/Class: 
// Created On: 14/Oct/2015
// Author: João Carreiro (joao.carreiro@cybermap.pt)
// Company: Cybermap Lda.
// Description:
// ============================================================================

"use strict";
angular.module('toolkit.cms').controller('tkEntityController', [
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

        $scope.entity = {};
        $scope.list = [];
        $scope.view = {};
        $scope.layout = null;
        $scope.toolbarItem = [];
        $scope.toolbarList = [];
        $scope.resources =
            {
                toolbar: {
                    'search-placeholder': 'Procurar...',
                    'create': 'Criar',
                    'refresh': '',
                    'defaultView': '<Todas Propriedades>'
                },
                item: {
                    'properties': 'Propriedades',
                    'view': 'Ver',
                    'edit': 'Editar',
                    'delete': 'Remover'
                }
            };

        //
        // CALLBACKS
        //

        var _detail = function (item) {

            var url = _formGetUrl(_form.view);
            $location.path(url.replace('{ID}', item.id));
        }

        var _create = function () {

            if (_formHas(_form.create)) {

                var url = _formGetUrl(_form.create);
                $location.path(url);

            }
            else {
                var schema = _schemaGet(_schema.create);

                if (toolkit.util.IsDefined(schema)) {

                    var protocol = { 'create': dal.create($scope.entity.api.create) };

                    var opt =
                        {
                            size: 'LARGE',
                            title: toolkit.util.IsDefined(schema.name) ? schema.name : 'Criar',
                            dimention: 'AUTO',
                            toolbar: [{ name: 'Guardar', action: 'save', native: 'close' }, { name: 'Cancelar', native: 'close' }],
                            input: { name: 'Form', options: { operation: 'CREATE', schema: schema.properties, protocol: protocol } },
                            callbacks: { 'on-close': _refresh },
                            error: error.display
                        };

                    $.Popup(opt);
                }
                else {

                    error.display('INTERNAL: Entity does not define a create form...');
                }
            }
        };

        var _properties = function (item) {

            var schema = _schemaGet(_schema.view);

            if (toolkit.util.IsDefined(schema)) {

                var opt =
                    {
                        size: 'LARGE',
                        title: toolkit.util.IsDefined(schema.name) ? schema.name : 'Propriedades',
                        dimention: 'AUTO',
                        toolbar: [{ name: 'Ok', native: 'close' }],
                        input: { name: 'Form', options: { operation: 'VIEW', item: item, schema: schema.properties } },
                        error: error.display
                    };

                $.Popup(opt);
            }
            else {

                error.display('INTERNAL: Entity does not define a view form...');
            }
        };

        var _edit = function (item) {

            if (_formHas(_form.create)) {

                var url = _formGetUrl(_form.edit);
                $location.path(url.replace('{ID}', item.id));

            }
            else {
                var schema = _schemaGet(_schema.edit);

                if (toolkit.util.IsDefined(schema)) {

                    var protocol = { 'update': dal.create($scope.entity.api.update) };

                    var opt =
                        {
                            size: 'LARGE',
                            title: toolkit.util.IsDefined(schema.name) ? schema.name : 'Editar',
                            dimention: 'AUTO',
                            toolbar: [{ name: 'Guardar', action: 'save', native: 'close' }, { name: 'Cancelar', native: 'close' }],
                            input: { name: 'Form', options: { operation: 'EDIT', item: item, schema: schema.properties, protocol: protocol } },
                            callbacks: { 'on-close': _refresh },
                            error: error.display
                        };

                    $.Popup(opt);

                }
                else {

                    error.display('INTERNAL: Entity does not define an edit form...');
                }
            }
        };

        var _delete = function (item) {

            var protocol = { 'delete': dal.delete($scope.entity.api.delete) };

            var opt =
                {
                    size: 'MEDIUM',
                    title: 'Remover [' + item.id + ']',
                    dimention: 'AUTO',
                    toolbar:
                        [
                            { name: 'Remover', promise: function () { return protocol['delete'](item.id) }, native: 'close' },
                            { name: 'Cancelar', native: 'close' }
                        ],
                    input: 'Tem a certeza que pretende eliminar este item \'' + item.id + '\' ?',
                    callbacks: { 'on-close': _refresh },
                    error: error.display
                };

            $.Popup(opt);
        };

        //
        // TOOLBARS
        //

        var _toolbarList = function (entity) {

            var buttonCreate =
                {
                    kind: 'BUTTON',
                    label: 'Criar',
                    thumbnail: 'plus',
                    type: 'default',
                    callback: _create,
                    where: 'left'
                };

            var boxSearch =
                {
                    kind: 'SEARCH',
                    placeholder: 'Procurar...',
                    thumbnail: 'search',
                    type: 'default',
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

            var toolbar = [];

            toolbar = (toolkit.util.IsDefined(entity.api) && toolkit.util.IsDefined(entity.api.create) && _schemaHas(_schema.create)) || (_formHas(_form.create)) ? [].concat(toolbar, buttonCreate) : toolbar;
            toolbar = [].concat(toolbar, boxSearch);
            toolbar = [].concat(toolbar, buttonRefresh);

            //
            // Set current list toolbar. 
            //

            $scope.toolbarList = toolbar;
        };

        var _toolbarItem = function (entity) {

            var buttonDetail =
                {
                    label: '',
                    thumbnail: 'link',
                    type: 'default',
                    callback: _detail

                };

            var buttonProperties =
                {
                    label: '',
                    thumbnail: 'list-alt',
                    type: 'default',
                    callback: _properties
                };

            var buttonEdit =
                {
                    label: '',
                    thumbnail: 'pencil',
                    type: 'default',
                    callback: _edit
                };

            var buttonDelete =
                {
                    label: '',
                    thumbnail: 'remove',
                    type: 'danger',
                    callback: _delete
                };

            var toolbar = [];

            toolbar = _formHas(_form.view) ? [].concat(toolbar, buttonDetail) : toolbar;

            toolbar = (toolkit.util.IsDefined(entity.api) && toolkit.util.IsDefined(entity.api.update) && _schemaHas(_schema.edit)) || (_formHas(_form.edit)) ? [].concat(toolbar, buttonEdit) : toolbar;

            toolbar = _schemaHas(_schema.view) ? [].concat(toolbar, buttonProperties) : toolbar;

            toolbar = toolkit.util.IsDefined(entity.api) && toolkit.util.IsDefined(entity.api.delete) ? [].concat(toolbar, buttonDelete) : toolbar;

            //
            // Set item toolbar.
            //

            $scope.toolbarItem = toolbar;
        };

        var _toolbarSetup = function (entity) {

            _toolbarItem(entity);
            _toolbarList(entity);
        };

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

        var _schemaGet = function (type) {

            var schema = null;

            if (toolkit.util.IsDefined($scope.entity.schemas)) {

                $.each($scope.entity.schemas, function (idx, elm) {

                    if (elm.type == type) {
                        schema = elm;
                        return false;
                    }
                });
            }

            return schema;
        };

        var _schemaHas = function (type) {

            return _schemaGet(type) != null;
        }

        //
        // FORMS
        //

        var _form = {
            'create': 'CREATE',
            'view': 'VIEW',
            'edit': 'EDIT'
        }

        var _formSetup = function (entity) { };

        var _formGet = function (type) {

            var form = null;

            if (toolkit.util.IsDefined($scope.entity.forms)) {

                $.each($scope.entity.forms, function (idx, elm) {

                    if (elm.type == type) {
                        form = elm;
                        return false;
                    }
                });
            }

            return form;
        };

        var _formHas = function (type) {

            return _formGet(type) != null;
        }

        var _formGetUrl = function (type) {

            return _formGet(type).url;
        };

        //
        // VIEWS
        //

        var _viewDefault = function () {

            var defaultView = null;

            if (toolkit.util.IsDefined($scope.entity.views)) {

                angular.forEach($scope.entity.views, function (view, idx0) {

                    if (view.isDefault) {

                        defaultView = view;
                        return false;
                    }
                });
            }

            return defaultView;
        };

        var _viewComplete = function (isDefault) {

            var view = null;

            if (toolkit.util.IsDefined($scope.entity.schemas)) {

                var schema = _schemaGet(_schema.default);

                if (toolkit.util.IsDefined(schema)) {

                    view = { id: 0, name: $scope.resources.toolbar.defaultView, isDefault: isDefault, fields: [] };

                    angular.forEach(schema.properties, function (property, idx0) {

                        var field = { name: property.name, displayName: property.displayName };
                        view.fields.push(field);

                    });
                }
            }

            return view;
        };

        var _viewSet = function (view) {

            var clonned = view;

            angular.forEach(clonned.fields, function (field, idx0) {

                angular.forEach($scope.entity.schema, function (property, idx1) {

                    if ((property.name == field.name) && (property.type == 'DATETIME')) {

                        field.filter = "date : 'dd/MM/yyyy HH:mm'";
                    }
                });
            });

            $scope.view = clonned;

        };

        var _viewChange = function () {

            var viewID = this.selected;

            //
            // find the view
            //

            if (-1 != viewID) {

                angular.forEach($scope.entity.views, function (view, idx0) {

                    if (viewID == view.id) {

                        _viewSet(view);
                        return false;
                    }
                });
            }
        };

        var _viewSetup = function (entity) {

            //
            // Process complete view option.
            //

            var hasDefaultView = _viewDefault() != null;
            var completeView = _viewComplete(!hasDefaultView);

            if (toolkit.util.IsDefined(completeView)) {

                entity.views.push(completeView);
            }

            //
            // Setup the filter for view, if no views
            // are found then dont add the view filter.
            //

            if (entity.views.length > 0) {

                //
                // Process the default view. If no view
                // if found as the default, then pick the 
                // first view in list.
                //

                var dftView = _viewDefault();

                if (!toolkit.util.IsDefined(dftView)) {

                    dftView = entity.view[0];
                }

                var filter =
                    [
                        {
                            kind: 'SELECT',
                            label: 'Vista:',
                            source: {
                                field: { value: 'id', name: 'name' },
                                items: entity.views
                            },
                            selected: dftView.id,
                            callback: _viewChange,
                            where: 'right'
                        }
                    ];

                //
                // Set the default view as the active view.
                //

                _viewSet(dftView);

                //
                // Add the filter to the toolbar.
                //

                $scope.toolbarList = [].concat(filter, $scope.toolbarList);
            }
        };

        //
        // LAYOUT
        //

        var _layoutChange = function () {

            $scope.layout = this.selected;
        };

        var _layoutSetup = function () {

            var options = [
                { name: 'Tabela', id: 'TABLE' },
                { name: 'Lista', id: 'LIST' },
                { name: 'Grelha', id: 'GRID' }
            ];

            //
            // Build the theme filter ui element.
            //

            var filter =
                    {
                        kind: 'SELECT',
                        label: 'Layout:',
                        source: {
                            field: { value: 'id', name: 'name' },
                            items: options
                        },
                        selected: 'LIST',
                        callback: _layoutChange,
                        where: 'right'
                    };

            //
            // Set the current layout for view.
            //

            $scope.layout = 'LIST';

            //
            // Add the filter to the toolbar.
            //

            $scope.toolbarList = [].concat(filter, $scope.toolbarList);
        };

        //
        // LOAD & REFRESH METHODS
        //

        var _load = function () {

            //
            // Extract entity reference for query string.
            //

            var entityRef = $routeParams.ref;
            var entityCfg = $routeParams.config;

            if (toolkit.util.IsDefined(entityRef)) {

                //
                // Load the entity specification.
                //

                ddl.get(entityRef).then(function (output) {

                    //
                    // Set the current entity object.
                    //

                    $scope.entity = output;

                    //
                    // Setup schema.
                    //

                    _schemaSetup($scope.entity);

                    //
                    // Setup forms.
                    //

                    _formSetup($scope.entity);

                    //
                    // Setup toolbars.
                    //

                    _toolbarSetup($scope.entity);

                    //
                    // Setup layout filter.
                    //

                    _layoutSetup();

                    //
                    // Setup the view selector.
                    //

                    _viewSetup($scope.entity);

                    //
                    // Load entity items.
                    //

                    _refresh();

                }, error.display);
            }
            else {

                error.message('Please define a valid entity!');
            }
        };

        var _refresh = function () {

            if (toolkit.util.IsDefined($scope) &&
                toolkit.util.IsDefined($scope.entity) &&
                toolkit.util.IsDefined($scope.entity.api) &&
                toolkit.util.IsDefined($scope.entity.api.list)) {

                dal.direct.list($scope.entity.api.list).then(function (list) { $scope.list = list; }, error.display);
            }
            else {

                error.message('Entity \'' + $scope.entity.name + '\' does not define an api to retrieve items...');
            }
        };

        //
        // INIT
        //

        _load();

    }
]);