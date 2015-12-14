// ============================================================================
// Project: Toolkit Angular
// Name/Class: 
// Created On: 14/Oct/2015
// Author: João Carreiro (joao.carreiro@cybermap.pt)
// Company: Cybermap Lda.
// Description: 
// ============================================================================

"use strict";
angular.module('toolkit.comm').factory('tkCommService', ['$q', '$http', function ($q, $http) {

    //
    // Base Url for API.
    //

    var _baseUrl = '[API]:~/comm/';

    //
    // CRUD operations.
    //

    var _trigger = function (obj) {

        if (obj instanceof Array) {
            _triggerMultiple(obj);
        }
        else {
            _triggerSingle(obj);
        }
    };

    var _triggerSingle = function (event) {

        var url = toolkit.url.Resolve(_baseUrl + 'trigger');
        return toolkit.angular.services.GetServicePromise($q, $http, 'post', url, event);
    };

    var _triggerMultiple = function (list) {

        var url = toolkit.url.Resolve(_baseUrl + 'trigger-multiple');
        return toolkit.angular.services.GetServicePromise($q, $http, 'post', url, list);
    };

    var _getAll = function (owner) {

        var url = toolkit.url.Resolve(_baseUrl + 'get-all' + '/' + owner);
        return toolkit.angular.services.GetServicePromise($q, $http, 'get', url);
    };

    var _getLatest = function (owner) {

        var url = toolkit.url.Resolve(_baseUrl + 'get-latest' + '/' + owner);
        return toolkit.angular.services.GetServicePromise($q, $http, 'get', url);
    };

    var _getUnread = function (owner) {

        var url = toolkit.url.Resolve(_baseUrl + 'get-unread' + '/' + owner);
        return toolkit.angular.services.GetServicePromise($q, $http, 'get', url);
    };

    var _markAsRead = function (notification) {

        var url = toolkit.url.Resolve(_baseUrl + 'mark-as-read');
        return toolkit.angular.services.GetServicePromise($q, $http, 'post', url, notification);
    };

    var _markAsUnread = function (notification) {

        var url = toolkit.url.Resolve(_baseUrl + 'mark-as-unread');
        return toolkit.angular.services.GetServicePromise($q, $http, 'post', url, notification);
    };

    var _markAllAsRead = function (owner) {

        var url = toolkit.url.Resolve(_baseUrl + 'mark-all-as-read');
        return toolkit.angular.services.GetServicePromise($q, $http, 'post', url, notification);
    };

    var _tick = function () {

        var url = toolkit.url.Resolve(_baseUrl + 'tick');
        return toolkit.angular.services.GetServicePromise($q, $http, 'get', url);
    };

    //
    // PROTOCOL
    //

    return {
        'trigger': _trigger,
        'getAll': _getAll,
        'getLatest': _getLatest,
        'getUnread': _getUnread,
        'markAsRead': _markAsRead,
        'markAsUnread': _markAsUnread,
        'markAllAsRead': _markAllAsRead,
        'tick': _tick
    };
}]);
