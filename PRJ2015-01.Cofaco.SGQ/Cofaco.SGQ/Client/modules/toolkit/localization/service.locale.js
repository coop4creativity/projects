// ============================================================================
// Project: Toolkit Angular
// Name/Class: 
// Created On: 14/Oct/2015
// Author: João Carreiro (joao.carreiro@cybermap.pt)
// Company: Cybermap Lda.
// Description: 
// ============================================================================

"use strict";
angular.module('toolkit.localization').factory('tkLocaleService', ['$q', '$http', function ($q, $http) {

    //
    // Base Url for API.
    //

    var _baseUrl = '[API]:~/locale/';

    //
    // CRUD operations.
    //

    var _update = function (item) {

        var url = toolkit.url.Resolve(_baseUrl + 'update');
        return toolkit.angular.services.GetServicePromise($q, $http, 'post', url, item);
    };

    var _get = function (id) {

        var url = toolkit.url.Resolve(_baseUrl + 'get' + '/' + id);
        return toolkit.angular.services.GetServicePromise($q, $http, 'get', url);
    };

    var _default = function () {

        var url = toolkit.url.Resolve(_baseUrl + 'get-default');
        return toolkit.angular.services.GetServicePromise($q, $http, 'get', url);
    };

    var _list = function () {

        var url = toolkit.url.Resolve(_baseUrl + 'list');
        return toolkit.angular.services.GetServicePromise($q, $http, 'get', url);
    };

    var _delete = function (id) {

        var url = toolkit.url.Resolve(_baseUrl + 'delete' + '/' + id);
        return toolkit.angular.services.GetServicePromise($q, $http, 'delete', url);
    };

    //
    // PROTOCOL
    //

    return {
        'update': _update,
        'get': _bundle,
        'default': _file,
        'list': _list,
        'delete': _delete
    };
}]);
