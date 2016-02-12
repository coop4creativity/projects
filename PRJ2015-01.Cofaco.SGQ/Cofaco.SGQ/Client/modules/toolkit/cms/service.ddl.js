// ============================================================================
// Project: Toolkit Angular
// Name/Class: 
// Created On: 14/Oct/2015
// Author: João Carreiro (joao.carreiro@cybermap.pt)
// Company: Cybermap Lda.
// Description:
// ============================================================================

"use strict";
angular.module('toolkit.cms').factory('tkEntityDDLService', ['$q', '$http', function ($q, $http) {

    var _baseUrl = '[API]:~/cmsddl/';

    //
    //
    //

    var _emuPromise = function (fun) {

        var deferred = $q.defer();

        deferred.resolve(fun());

        return deferred.promise;
    };


    //
    // TYPES
    //

    var _types = function () {
        return {
            'list': function () {
                return _emuPromise(function () {
                    return [
                        { name: 'Sim/Não', val: 'BOOL' },
                        { name: 'Texto (Simples)', val: 'TEXT' },
                        { name: 'Texto (Bloco)', val: 'TEXT-BLOCK' },
                        { name: 'Numero', val: 'NUMBER' },
                        { name: 'Password', val: 'PASSWORD' },
                        { name: 'Data', val: 'DATETIME' }
                    ];
                });
            }
        };
    };
    //
    // CLUSTERS
    //

    var _cluster_get = function (ref) {

        return isNaN(ref) ? _cluster_getByRef(ref) : __cluster_getByID(ref);
    }

    var __cluster_getByID = function (id) {

        var url = toolkit.url.Resolve(_baseUrl + 'cluster-get' + '/' + id);
        return toolkit.angular.services.GetServicePromise($q, $http, 'get', url);
    };

    var _cluster_getByRef = function (ref) {

        var url = toolkit.url.Resolve(_baseUrl + 'cluster-get-by-ref' + '/' + ref);
        return toolkit.angular.services.GetServicePromise($q, $http, 'get', url);
    };

    var _cluster_update = function (item) {

        var url = toolkit.url.Resolve(_baseUrl + 'cluster-update');
        return toolkit.angular.services.GetServicePromise($q, $http, 'post', url, item);
    };

    var _cluster_add_entity = function (id, item) {

        var url = toolkit.url.Resolve(_baseUrl + 'cluster-add-entity/' + id);
        return toolkit.angular.services.GetServicePromise($q, $http, 'post', url, item);
    };

    //
    // ENTITIES
    //

    var _entity_create = function (item) {

        var url = toolkit.url.Resolve(_baseUrl + 'entity-create');
        return toolkit.angular.services.GetServicePromise($q, $http, 'post', url, item);
    }
    //
    // Get the entity based on a reference or unique identifier.
    // @param entityRef The entity reference or unique identifier.
    //

    var _entity_get = function (entityRef) {

        return isNaN(entityRef) ? _entity_getByRef(entityRef) : _entity_getByID(entityRef);
    }

    //
    // Get entity definition by unique identifier.
    // @param id The entity unique identifier.
    //

    var _entity_getByID = function (id) {

        var url = toolkit.url.Resolve(_baseUrl + 'entity-get' + '/' + id);
        return toolkit.angular.services.GetServicePromise($q, $http, 'get', url);
    };

    //
    // Get entity definition by reference.
    // @param ref The entity reference.
    //

    var _entity_getByRef = function (ref) {

        var url = toolkit.url.Resolve(_baseUrl + 'entity-get-by-ref' + '/' + ref);
        return toolkit.angular.services.GetServicePromise($q, $http, 'get', url);
    };

    //
    // Get a list of entities.
    //

    var _entity_list = function () {

        var url = toolkit.url.Resolve(_baseUrl + 'entity-list');
        return toolkit.angular.services.GetServicePromise($q, $http, 'get', url);
    };

    //
    // PROTOCOL
    //

    return {

        'get': _entity_get,
        'getByID': _entity_getByID,
        'getByRef': _entity_getByRef,
        'list': _entity_list,
        'entity': {
            'create': _entity_create,
            'get': _entity_get,
            'getByID': _entity_get,
            'getByRef': _entity_getByRef,
            'list': _entity_list,
        },
        'cluster': {
            'get': _cluster_get,
            'getByID': _cluster_get,
            'getByRef': _cluster_getByRef,
            'update': _cluster_update,
            'addEntity': _cluster_add_entity
        },
        'type': _types()
    };

}]);