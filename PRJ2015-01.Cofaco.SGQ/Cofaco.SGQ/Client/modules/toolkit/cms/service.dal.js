// ============================================================================
// Project: Toolkit Angular
// Name/Class: 
// Created On: 14/Oct/2015
// Author: João Carreiro (joao.carreiro@cybermap.pt)
// Company: Cybermap Lda.
// Description:
// ============================================================================

"use strict";
angular.module('toolkit.cms').factory('tkEntityDALService', ['$q', '$http', function ($q, $http) {

    //
    // Base Url for API.
    //

    var _baseUrl = '[API]:~/';

    //
    // CRUD operations.
    //

    var _createPromise = function (partial) {

        return function (item) {
            return _create(partial, item);
        }
    };

    var _create = function (partial, item) {

        var url = toolkit.url.Resolve(_baseUrl + '/' + partial);
        return toolkit.angular.services.GetServicePromise($q, $http, 'post', url, item);
    };

    var _getPromise = function (partial) {

        return function (id) {
            return _get(partial, id);
        }
    };

    var _get = function (partial, id) {

        var url = toolkit.url.Resolve(_baseUrl + '/' + partial + '/' + id);
        return toolkit.angular.services.GetServicePromise($q, $http, 'get', url);
    };

    var _listPromise = function (partial) {

        return function () {
            return _list(partial);
        }
    };

    var _list = function (partial) {

        var url = toolkit.url.Resolve(_baseUrl + '/' + partial);
        return toolkit.angular.services.GetServicePromise($q, $http, 'get', url);
    };

    var _updatePromise = function (partial) {

        return function (item) {
            return _update(partial, item);
        }
    };

    var _update = function (partial, item) {

        var url = toolkit.url.Resolve(_baseUrl + '/' + partial);
        return toolkit.angular.services.GetServicePromise($q, $http, 'post', url, item);
    };

    var _deletePromise = function (partial) {

        return function (id) {
            return _delete(partial, id);
        }
    };

    var _delete = function (partial, id) {

        var url = toolkit.url.Resolve(_baseUrl + '/' + partial + '/' + id);
        return toolkit.angular.services.GetServicePromise($q, $http, 'delete', url);
    };

    //
    // Function to return a specific entity protocol
    // @param partial the partialurl bit.
    //

    var _stdProtocol = function (partial) {

        return {
            'create': function (item) { return _create(partial + '/create', item) },
            'get': function (id) { return _get(partial + '/get', id); },
            'list': function () { return _list(partial + '/list'); },
            'update': function (item) { return _update(partial + '/update', item); },
            'delete': function (id) { return _delete(partial + '/delete', id); }
        };

    }

    //
    // PROTOCOL
    //

    return {

        'standard': _stdProtocol,

        'create': _createPromise,
        'get': _getPromise,
        'list': _listPromise,
        'update': _updatePromise,
        'delete': _deletePromise,

        'direct': {
            'create': _create,
            'get': _get,
            'list': _list,
            'update': _update,
            'delete': _delete
        }
    };

}]);
