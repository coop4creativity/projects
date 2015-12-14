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
    // Get the entity based on a reference or unique identifier.
    // @param entityRef The entity reference or unique identifier.
    //

    var _get = function (entityRef) {

        return isNaN(entityRef) ? _getByRef(entityRef) : _getByID(entityRef);
    }

    //
    // Get entity definition by unique identifier.
    // @param id The entity unique identifier.
    //

    var _getByID = function (id) {

        var url = toolkit.url.Resolve(_baseUrl + 'entity-get' + '/' + id);
        return toolkit.angular.services.GetServicePromise($q, $http, 'get', url);
    };

    //
    // Get entity definition by reference.
    // @param ref The entity reference.
    //

    var _getByRef = function (ref) {

        var url = toolkit.url.Resolve(_baseUrl + 'entity-get-by-ref' + '/' + ref);
        return toolkit.angular.services.GetServicePromise($q, $http, 'get', url);
    };

    //
    // Get a list of entities.
    //

    var _list = function () {

        var url = toolkit.url.Resolve(_baseUrl + 'entity-list');
        return toolkit.angular.services.GetServicePromise($q, $http, 'get', url);
    };

    //
    // PROTOCOL
    //

    return {

        'get': _get,
        'getByID': _get,
        'getByRef': _getByRef,
        'list': _list
    };

}]);