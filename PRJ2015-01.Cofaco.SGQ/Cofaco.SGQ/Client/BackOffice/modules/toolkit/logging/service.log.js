// ============================================================================
// Project: Toolkit Angular
// Name/Class: 
// Created On: 14/Oct/2015
// Author: João Carreiro (joao.carreiro@cybermap.pt)
// Company: Cybermap Lda.
// Description: 
// ============================================================================

"use strict";
angular.module('toolkit.logging').factory('tkLogService', ['$q', '$http', function ($q, $http) {

    //
    // Base Url for API.
    //

    var _baseUrl = '[API]:~/log/';

    //
    // CRUD operations.
    //

    var _create = function (item) {

        var url = toolkit.url.Resolve(_baseUrl + 'log');
        return toolkit.angular.services.GetServicePromise($q, $http, 'post', url, item);
    };

    var _list = function () {

        var url = toolkit.url.Resolve(_baseUrl + 'get-all');
        return toolkit.angular.services.GetServicePromise($q, $http, 'get', url);
    };

    var _archive = function (list) {

        var url = toolkit.url.Resolve(_baseUrl + 'archive');
        return toolkit.angular.services.GetServicePromise($q, $http, 'post', url, list);
    };

    var _restore = function (list) {

        var url = toolkit.url.Resolve(_baseUrl + 'unarchive');
        return toolkit.angular.services.GetServicePromise($q, $http, 'post', url, list);
    };

    //
    // PROTOCOL
    //

    return {
        'create': _create,
        'list': _list,
        'archive': _archive,
        'restore': _restore
    };
}]);
