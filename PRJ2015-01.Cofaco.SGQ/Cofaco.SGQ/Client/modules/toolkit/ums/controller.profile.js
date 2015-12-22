// ============================================================================
// Project: Toolkit Angular
// Name/Class: 
// Created On: 14/Oct/2015
// Author: João Carreiro (joao.carreiro@cybermap.pt)
// Company: Cybermap Lda.
// Description: 
// ============================================================================

'use strict';
angular.module('toolkit.ums').controller('tkUserProfileController', [
    '$scope',
    '$location',
    'tkAuthService', function ($scope, $location, tkAuthService) {

        //
        // Item information.
        //

        var _item = {};

        //
        // Refresh profile information.
        //

        function _refresh() {
        };

        //
        // Start by loading data.
        //

        _refresh();
    }
]);