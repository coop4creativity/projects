'use strict';
app.controller('home-controller', [
    '$scope',
    '$location',
    '$routeParams',
    'tkAuthService',
    'tkErrorService',
    function ($scope, $location, $routeParams, tkAuthService, error) {

        //
        // SETTINGS
        //

        var _refresh = function () {

            if (tkAuthService.authentication.isAuth) {

            }
        };

        //
        // INIT
        //

        _refresh();

    }
]);
