// ============================================================================
// Project: Toolkit
// Name/Class: 
// Created On: 18/Mar/2015
// Author: João Carreiro (joao.carreiro@cybermap.pt)
// Company: Cybermap Lda.
// Description:
// ============================================================================

'use strict';

angular.module('toolkit.settings').service('tk.settings.runtime.service', ['localStorageService', function (localStorageService) {

    //
    // Storage variable.
    //

    var _settings = {};

    //
    // _get
    // Retrieve the value of a setting.
    //

    var _get = function (name) { if (toolkit.util.AreDefined(name, _settings[name])) { return _settings[name]; } else { return null; } };

    //
    // _set
    // Set the value of a specific setting.
    //

    var _set = function (name, value) { if (toolkit.util.AreDefined(name, value)) { _settings[name] = value; } };

    //
    // _import
    // Import list of settings.
    //

    var _import = function (list) {

        if (toolkit.util.IsDefined(list)) {

            var name = '';
            var value = null;

            $.each(list, function (idx, elm) {

                //
                // if index is an odd number.
                //

                if (idx & 1) {

                    value = elm;
                    _set(name, value);
                }
                else {
                    name = elm;
                }
            });
        }
    };

    //
    // Service external protocol.
    //

    this.get = _get;
    this.set = _set;
    this.import = _import;
}]);
