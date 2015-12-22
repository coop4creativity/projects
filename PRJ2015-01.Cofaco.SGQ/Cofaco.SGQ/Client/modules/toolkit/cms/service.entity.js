// ============================================================================
// Project: Toolkit Angular
// Name/Class: 
// Created On: 14/Oct/2015
// Author: João Carreiro (joao.carreiro@cybermap.pt)
// Company: Cybermap Lda.
// Description:
// ============================================================================

"use strict";
angular.module('toolkit.cms').factory('tkEntityUtilService', ['$q', '$http', function ($q, $http) {

    //
    // SCHEMAS
    //

    var _schemaSetup = function (entity) { };

    var _schemaGet = function (entity, type) {

        var schema = null;

        if (toolkit.util.AreDefined(entity, type) && toolkit.util.IsDefined(entity.schemas)) {

            $.each(entity.schemas, function (idx, elm) {

                if (toolkit.util.IsDefined(elm) && (elm.type == type)) {

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
    // FORMS
    //

    var _formSetup = function (entity) { };

    var _formGet = function (entity, type) {

        var form = null;

        if (toolkit.util.AreDefined(entity, type) && toolkit.util.IsDefined(entity.forms)) {

            $.each(entity.forms, function (idx, elm) {

                if (toolkit.util.IsDefined(elm) && (elm.type == type)) {

                    form = elm;
                    return false;
                }
            });
        }

        return form;
    };

    var _formHas = function (entity, type) {

        return _formGet(entity, type) != null;
    }

    var _formGetUrl = function (entity, type) {

        var url = null;
        var form = _formGet(entity, type);

        if (toolkit.util.IsDefined(form)) {

            url = form.url;
        }

        return url;
    };

    //
    // PROPERTIES
    //

    //
    // OPERATIONS
    //

    var _opEnableCreate = function (entity) {

        return toolkit.util.IsDefined(entity) &&
               ((toolkit.util.IsDefined(entity.api) &&
                 toolkit.util.IsDefined(entity.api.create) &&
                 _schemaHas(entity, 'CREATE')) || (_formHas(entity, 'CREATE')));

    };

    var _opEnableEdit = function (entity) {

        return toolkit.util.IsDefined(entity) &&
               ((toolkit.util.IsDefined(entity.api) &&
                 toolkit.util.IsDefined(entity.api.update) &&
                 _schemaHas(entity, 'EDIT')) || (_formHas(entity, 'EDIT')));
    };

    var _opEnableDelete = function (entity) {

        return toolkit.util.IsDefined(entity) &&
               toolkit.util.IsDefined(entity.api) &&
               toolkit.util.IsDefined(entity.api.delete);
    };

    //
    // PROTOCOL
    //

    return {

        'schema': {
            'constants': {
                DEFAULT: 'DEFAULT',
                CREATE: 'CREATE',
                VIEW: 'VIEW',
                EDIT: 'EDIT'
            },
            'setup': _schemaSetup,
            'get': _schemaGet,
            'has': _schemaHas
        },

        'forms': {
            'constants': {
                CREATE: 'CREATE',
                VIEW: 'VIEW',
                EDIT: 'EDIT'
            },
            'setup': _formSetup,
            'get': _formGet,
            'has': _formGet,
            'url': _formGetUrl
        },

        'enable': {
            'create': _opEnableCreate,
            'edit': _opEnableEdit,
            'delete': _opEnableDelete
        },

        'properties': {}

    };
}]);
