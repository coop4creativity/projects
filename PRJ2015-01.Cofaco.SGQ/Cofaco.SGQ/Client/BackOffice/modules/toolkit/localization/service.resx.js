// ============================================================================
// Project: Toolkit Angular
// Name/Class: 
// Created On: 14/Oct/2015
// Author: João Carreiro (joao.carreiro@cybermap.pt)
// Company: Cybermap Lda.
// Description: 
// ============================================================================

"use strict";
angular.module('toolkit.localization').factory('tkResourceBundleService', ['$q', '$http', function ($q, $http) {

    //
    // Base Url for API.
    //

    var _baseUrl = '[API]:~/resx/';

    //
    // CRUD operations.
    //

    var _update = function (item) {

        var url = toolkit.url.Resolve(_baseUrl + 'update');
        return toolkit.angular.services.GetServicePromise($q, $http, 'post', url, item);
    };

    var _bundle = function (id) {

        var url = toolkit.url.Resolve(_baseUrl + 'bundle' + '/' + id);
        return toolkit.angular.services.GetServicePromise($q, $http, 'get', url);
    };

    var _file = function (locale, bundle) {

        var url = toolkit.url.Resolve(_baseUrl + 'bundle' + '/' + locale + '?bundle=' + bundle);
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
        'bundle': _bundle,
        'file': _file,
        'delete': _delete
    };
}]);
