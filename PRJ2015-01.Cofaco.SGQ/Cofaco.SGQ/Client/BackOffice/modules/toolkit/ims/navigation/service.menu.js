// ============================================================================
// Project: Toolkit Angular
// Name/Class: 
// Created On: 14/Oct/2015
// Author: João Carreiro (joao.carreiro@cybermap.pt)
// Company: Cybermap Lda.
// Description: 
// ============================================================================

"use strict";
angular.module('toolkit.ims').factory('tkMenuService', ['$q', '$http', function ($q, $http) {

    //
    // Base Url for API.
    //

    var _baseUrl = '[API]:~/menu/';

    //
    // CRUD operations.
    //

    var _get = function (id) {

        var url = toolkit.url.Resolve(_baseUrl + 'get' + '/' + id);
        return toolkit.angular.services.GetServicePromise($q, $http, 'get', url);
    };

    var _update = function (item) {

        var url = toolkit.url.Resolve(_baseUrl + 'update');
        return toolkit.angular.services.GetServicePromise($q, $http, 'post', url, item);
    };

    var _delete = function (id) {

        var url = toolkit.url.Resolve(_baseUrl + 'delete' + '/' + id);
        return toolkit.angular.services.GetServicePromise($q, $http, 'delete', url);
    };

    //
    // PROTOCOL
    //

    return {
        'get': _get,
        'update': _update,
        'delete': _delete
    };
}]);
