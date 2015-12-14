// ============================================================================
// Project: Toolkit Angular
// Name/Class: 
// Created On: 14/Oct/2015
// Author: João Carreiro (joao.carreiro@cybermap.pt)
// Company: Cybermap Lda.
// Description: 
// ============================================================================

"use strict";
angular.module('toolkit.core').factory('tkErrorService', function () {

    //
    // Display a error test message to user.
    // @pa  ram msg Message to display
    //

    var _message = function (msg) {

        _show(JSON.stringify(msg));
    }

    //
    // Display an error item to user.
    // @param err The error item to display
    //

    var _display = function (err) {

        _show(JSON.stringify(err));
    }

    //
    // Worker function for displaying error.
    // @param html The html payload.
    //

    var _show = function (html) {

        var opt =
            {
                size: 'LARGE',
                title: 'Erro',
                dimention: 'AUTO',
                toolbar: [{ name: 'Ok', native: 'close' }],
                input: html
            };

        $.Popup(opt);
    }

    //
    // PROTOCOL
    //

    return {

        'message': _message,
        'display': _display
    };
});