// ============================================================================
// Project: Toolkit Angular
// Name/Class: 
// Created On: 14/Oct/2015
// Author: João Carreiro (joao.carreiro@cybermap.pt)
// Company: Cybermap Lda.
// Description: 
// ============================================================================

angular.module('toolkit.core').filter('filterpicker', function ($interpolate) {
    return function (item, name) {
        if (angular.isDefined(name) && name != '') {
            var result = $interpolate('{{value | ' + arguments[1] + '}}');
            return result({ value: arguments[0] });
        }
        return item;
    };
});