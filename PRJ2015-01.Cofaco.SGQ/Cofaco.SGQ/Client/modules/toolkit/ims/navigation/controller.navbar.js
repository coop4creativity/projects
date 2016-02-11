// ============================================================================
// Project: Toolkit Angular
// Name/Class: 
// Created On: 14/Oct/2015
// Author: João Carreiro (joao.carreiro@cybermap.pt)
// Company: Cybermap Lda.
// Description:
// ============================================================================

'use strict';
angular.module('toolkit.ims').controller('tkNavbarController', [
    '$scope',
    '$location',
    'tkErrorService',
    'tkAuthService',
    'tkMenuService',

    function ($scope, $location, error, tkAuthService, menu) {

        //
        // Setup the authentication based on the service.
        //

        var _authentication;
        var _isLoggedUser;
        var _menuName = 'navbar';

        //
        // Main menu navigation.
        //

        $scope.menu = [];
        $scope.item = null;

        $scope.config = {

            visible: true,
            affixed: 'top',
            fluid: false,
            search: {
                show: false,
                terms: '',
                fn: null,
            },
            brand: { name: __NAME, url: '/' },
            inverse: false,
            styling: 'inverse',
            menu: [],
            navfn: function (item) {

                if (angular.isDefined(item)) {
                    if (angular.isDefined(item.callback)) {
                        item.callback(item);
                    }
                    else if (angular.isDefined(item.url)) {
                        $location.path(item.url);
                    }
                }
            }
        };

        //
        // Load menu and process it.
        //

        var _load = function () {

            menu.get(_menuName).then(function (output) {

                //
                // Set the menu object.
                //

                $scope.menu = output;

                //
                // Define the menu item profile.
                //

                _defineProfile();

                //
                // Instantiate menu placeholders.
                //

                _defineMenu($scope.menu);

                //
                // Highlight current menu item.
                //

                _defineCurrentView('#' + $location.path());

                //
                // Hookup the change view event, so that we can hightlight
                // the menu and perform relevant operations.
                //        

                $scope.$on("$locationChangeStart", function (event, next, current) {

                    _defineProfile();
                    _defineMenu($scope.menu);
                    _defineCurrentView(next);
                });


            }, error.display);
        };

        //
        // Process the authentication information.
        // Setup the user profile.
        //

        var _defineProfile = function () {

            //
            // Setup the authentication based on the service.
            //

            _authentication = tkAuthService.authentication;

            //
            // Flag that states if we have a logged user.
            //

            _isLoggedUser = _authentication.isAuth;
            $scope.isLoggedUser = _authentication.isAuth;
        }

        //
        // Process the menu. The menu option are dependant
        // on the user type. Admin users have more options.
        // 

        var _defineMenu = function (menu) {

            //
            // Generate new menu.
            //

            $.each(menu.items, function (idx, item) {

                item.title = item.name.replace('${USER}', _authentication.userName);

                if (toolkit.util.IsDefined(item.action)) {

                    switch (item.action) {
                        case 'LOGOUT':
                            {
                                item.callback = _logOut;
                                item.url = null;
                            }
                            break;
                    }
                }
            });

            $scope.config.menu = menu.items;
        }

        //
        // Highlight menu option to current view.
        //

        var _defineCurrentView = function (absViewUrl) {

            //
            // Get the section from the view after, but
            // including the # character.
            //

            if (toolkit.util.IsDefined(absViewUrl)) {

                //
                // remove start #
                //

                var parcels = absViewUrl.split('#');
                if (parcels.length > 1) {

                    var viewUrl = parcels[1];

                    //
                    // Search the menu and try to find a corresponding url.
                    //

                    $.each($scope.menu.items, function (idx, item) {

                        item.active = toolkit.util.IsDefined(item.url) && item.url == viewUrl;
                    });
                }
            }
        }

        //
        // Logout callback.
        //

        var _logOut = function () {

            tkAuthService.logOut();
            $location.path('/login');
        }

        //
        // INIT
        //

        _load();
    }
]);