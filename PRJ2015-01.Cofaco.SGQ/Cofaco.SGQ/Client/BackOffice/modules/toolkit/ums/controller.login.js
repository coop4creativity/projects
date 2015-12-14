// ============================================================================
// Project: Toolkit Angular
// Name/Class: tkLoginController
// Created On: 14/Oct/2015
// Author: João Carreiro (joao.carreiro@cybermap.pt)
// Company: Cybermap Lda.
// Description: Login controller definition.
// ============================================================================

'use strict';
angular.module('toolkit.ums').controller('tkLoginController', [
    '$scope',
    '$location',
    'tkAuthService',
    'tkRuntime',
    function ($scope, $location, tkAuthService, tkRuntime) {

        //
        // Login details.
        //

        $scope.loginData = {
            userName: '',
            password: '',
            rememberMe: false,
            useRefreshTokens: false
        };

        //
        // Controller configuration/settings.
        //

        var _config = {

            resource: {
                logoUrl: '',
                title: '',
                description: '',
                userName: 'Username',
                password: 'Password',
                rememberMe: 'Remember Me',
                submit: 'Login'
            },

            setting: {
                redirectUrl: ''
            },

            errMsg: {
                MSG_GENERIC_ERROR_MESSAGE: 'Error occured during login!'
            }
        };

        $scope.config = {};

        //
        // Process settings. Merge the defined settings
        // for this component found in the runtime with 
        // default values.
        //

        var _processConfig = function () {

            //
            // Fetch the configuration for this service, merge
            // with default values and set the scope object.
            //

            $.extend(true, $scope.config, _config, tkRuntime.get("controller.tkLoginController"));
        }

        //
        // Error message for login.
        //

        $scope.verified = false;
        $scope.errMessage = '';
        $scope.wrnMessage = '';

        //
        // Verify the configuration and other data
        // for login.
        //

        var _verify = function () {

            var _verified = true;
            var _errMsg = '';
            var _wrnMsg = '';

            if (!toolkit.util.IsDefined($scope.config)) {

                _verified = false;
                _errMsg = 'INTERNAL: Controller configuration object is not defined!';

            } else if (!toolkit.util.AreDefined($scope.config.setting, $scope.config.setting.redirectUrl)) {

                _verified = false;
                _errMsg = 'INTERNAL: No redirect url is defined, user wont be able to leave this page!';
            }

            //
            // Set the verified state for controller.
            //

            $scope.verified = _verified;
            $scope.errMessage = _errMsg;
            $scope.wrnMessage = _wrnMsg;
        };

        //
        // Clear the error state.
        // Used each time the user click the login button.
        //

        var _clear = function () {

            $scope._errMsg = '';
            $scope._wrnMsg = '';
        }

        //
        // Perform the login after user clicks the button.
        // This will perform all necessary checks.
        //

        var _login = function () {

            //
            // Clear the error state.
            //

            _clear();

            //
            // Verify input data.
            //

            var checked = tkAuthService.verify($scope.loginData);
            if (!checked.error) {

                tkAuthService.login($scope.loginData).then(
                    function (response) {
                        $location.path($scope.config.setting.redirectUrl);
                    },
                    function (err) {
                        if (null != err) { $scope.errMessage = err.error_description; }
                        else { $scope.errMessage = $scope.config.errMsg.MSG_GENERIC_ERROR_MESSAGE; }
                    });
            }
            else {

                $scope.errMessage = checked.msg;
            }
        };

        $scope.login = _login;

        //
        // Initialize service.
        // Process initial settings and verifications.
        //

        _processConfig();
        _verify();
    }]);