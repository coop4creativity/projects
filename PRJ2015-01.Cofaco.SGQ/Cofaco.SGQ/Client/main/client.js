"use strict";
app.factory('client', ['$q', '$http', function ($q, $http) {

    //
    // Base Url for API.
    //

    var _baseUrl = '[API]:~/';

    //
    //
    //

    var _emuPromise = function (fun) {

        var deferred = $q.defer();

        deferred.resolve(fun());

        return deferred.promise;
    };

    //
    // UTIL - Get entity standard API protocol.
    //

    var _get_standard_protocol = function (baseUrl) {
        return {
            'create': function (item) {
                var url = toolkit.url.Resolve(baseUrl + 'create');
                return toolkit.angular.services.GetServicePromise($q, $http, 'post', url, item);
            },
            'get': function (id) {
                var url = toolkit.url.Resolve(baseUrl + 'get/' + id);
                return toolkit.angular.services.GetServicePromise($q, $http, 'get', url);
            },
            'list': function () {
                var url = toolkit.url.Resolve(baseUrl + 'list');
                return toolkit.angular.services.GetServicePromise($q, $http, 'get', url);
            },
            'update': function (item) {
                var url = toolkit.url.Resolve(baseUrl + 'update');
                return toolkit.angular.services.GetServicePromise($q, $http, 'post', url, item);
            },
            'delete': function (id) {
                var url = toolkit.url.Resolve(baseUrl + 'delete/' + id);
                return toolkit.angular.services.GetServicePromise($q, $http, 'delete', url);
            }
        }
    };

    //
    // AUDIT
    // 

    var _audit_template = _get_standard_protocol(_baseUrl + 'audittemplate/');

    var _audit_answer_types = function () {
        return {
            'list': function () {
                return _emuPromise(function () {
                    return [
                        { name: 'Sim/Não', val: 'BOOL' },
                        { name: 'Texto', val: 'TEXT' },
                        { name: 'Inteiro', val: 'INT' },
                        { name: 'Decimal', val: 'FLOAT' },
                        { name: 'Data', val: 'DATE' }
                    ];
                });
            }
        };
    };

    var _audit = {
        'template': _audit_template,
        'types': _audit_answer_types()
    };

    //
    // PROCESS
    // 

    var _process_ddl = _get_standard_protocol(_baseUrl + 'storeddl/');

    var _process = {
        'ddl': _process_ddl,
        'types': _audit_answer_types()
    };

    //
    // USER
    //    

    var _get_user = function (baseUrl) {
        return {
            'changePasswordPromise': function () {
                return function (item) {
                    return _user.changePassword(item);
                }
            },

            'changePassword': function (item) {
                var url = toolkit.url.Resolve(baseUrl + 'change-password');
                return toolkit.angular.services.GetServicePromise($q, $http, 'post', url, item);
            }
        }
    }

    var _user = $.extend(true, _get_standard_protocol(_baseUrl + 'user/'), _get_user(_baseUrl + 'user/'));

    //
    // PROTOCOL
    //

    return {
        'audit': _audit,
        'process': _process,
        'user': _user
    };

}]);
