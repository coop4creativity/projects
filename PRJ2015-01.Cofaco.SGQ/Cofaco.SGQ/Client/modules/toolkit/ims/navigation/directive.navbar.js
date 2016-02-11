//
// Angled Navbar Directive
// @param brand
// @param menu
// @param affixed
// @param search
// @param searchfn
// @param fluid
// @param navfn
// @param inverse
// @requires: ngSanitize, Bootstrap 3 (jQuery & Bootstrap's JS)
//

angular.module('toolkit.ims').directive('tkNavbar', function () {
    return {
        restrict: 'AE',
        scope: {
            visible: '=',
            brand: '=',
            menu: '=',
            affixed: '=',
            search: '=',
            searchfn: '&',
            fluid: '=',
            navfn: '&',
            inverse: '='
        },
        templateUrl: 'tmpls/toolkit.ims/navigation/navbar.html',
        controller: function ($scope, $element, $attrs) {

            //
            // Default values.
            //

            $scope.defaults = {
                brand: { name: 'APP', url: '/' },
                fluid: false,
                menu: [],
                search: {
                    show: false
                }
            };

            //
            // brand default.
            //

            if (angular.isUndefined($attrs.brand)) {

                $scope.brand = angular.merge({}, $attrs.brand);
            }

            // 
            // if no parent function was passed to directive for 
            // navfn, then create one to emit an event
            //

            if (angular.isUndefined($attrs.navfn)) {
                $scope.navfn = function (action) {
                    if (angular.isObject(action))
                        $scope.$emit('nav.menu', action);
                    else
                        $scope.$emit('nav.menu', {
                            'action': action
                        });
                };
            }

            //
            // if no parent function was passed to directive for searchfn, 
            // then create one to emit a search event
            //

            if (angular.isUndefined($attrs.searchfn)) {
                $scope.searchfn = function () {
                    $scope.$emit('nav.search.execute');
                };
            }

            //
            // Watchers.
            //

            $scope.$watch('affixed', function (val, old) {
                var b = angular.element('body');

                if (angular.equals(val, 'top') && !b.hasClass('navbar-affixed-top')) {

                    // 
                    // affixed top
                    //

                    if (b.hasClass('navbar-affixed-bottom')) {
                        b.removeClass('navbar-affixed-bottom');
                    }

                    b.addClass('navbar-affixed-top');
                }
                else if (angular.equals(val, 'bottom') && !b.hasClass('navbar-affixed-bottom')) {

                    //
                    // affixed bottom
                    //                    

                    if (b.hasClass('navbar-affixed-top')) {
                        b.removeClass('navbar-affixed-top');
                    }

                    b.addClass('navbar-affixed-bottom');

                } else {

                    //
                    // not affixed
                    //

                    if (b.hasClass('navbar-affixed-top')) {
                        b.removeClass('navbar-affixed-top');
                    }

                    if (b.hasClass('navbar-affixed-bottom')) {
                        b.removeClass('navbar-affixed-bottom');
                    }
                }
            });

            //
            // No-Operation
            // 

            $scope.noop = function () {
                angular.noop();
            };

            //
            // No-Operation
            // 

            $scope.brandClick = function () {

                if (angular.isDefined($scope.brand.url)) {
                    $scope.navfn({ 'item': { url: $scope.brand.url } });
                }
            };

            //
            // Nav action.
            //

            $scope.navAction = function (item) {
                $scope.navfn({ 'item': item });
            };

            //
            // Has Menus- Checks to see if there were menu 
            // passed in for the navbar.
            // @result boolean, true of the user specified 
            // a menu, false otherwise.
            //

            $scope.hasMenus = function () {
                return (angular.isDefined($attrs.menu));
            };

            //
            // Has Dropdown Menu. Check to see if navbar 
            // item should have a dropdown menu.
            // @param menuItem the menu to check
            // @result true if the menu item has a dropdown
            // false, otherwise.
            //

            $scope.hasDropdownMenu = function (menuItem) {
                return (angular.isDefined(menuItem.menu) && angular.isArray(menuItem.menu));
            };

            //
            // Is Divider. Check to see if dropdown menu 
            // item is to be a menu divider.
            // @param item the menu item.
            // @result true if the item is a divier, 
            // false otherwise.
            //

            $scope.isDivider = function (item) {
                return (angular.isDefined(item.divider) && angular.equals(item.divider, true));
            };
        }
    };
})

.run(function ($templateCache) {
    $templateCache.put('tmpls/toolkit.ims/navigation/navbar.html',
        /**/'<nav class="navbar" data-ng-show="visible" data-ng-class="{\'navbar-inverse\': inverse,\'navbar-default\': !inverse, \'navbar-fixed-top\': affixed == \'top\',\'navbar-fixed-bottom\': affixed == \'bottom\'}" role="navigation">' +
        /*      */'<div data-ng-class="[fluid ? \'container-fluid\' : \'container\']">' +
        /*          */'<div class="navbar-header">' +
        /*              */'<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu">' +
        /*                  */'<span class="sr-only">Toggle Navigation</span>' +
        /*                  */'<span class="icon-bar"></span>' +
        /*                  */'<span class="icon-bar"></span>' +
        /*                  */'<span class="icon-bar"></span>' +
        /*              */'</button>' +
        /*              */'<a class="navbar-brand" ng-click="brandClick()">{{ brand.name }}</a>' +
        /*          */'</div>' +
        /*          */'<div class="collapse navbar-collapse" id="navbar-menu">' +
        /*              */'<ul class="nav navbar-nav navbar-right" ng-if="hasMenus()">' +
        /*                  */'<li ng-repeat="menuItem in menu" ng-class="[hasDropdownMenu(menuItem) ? \'dropdown\':\'\', menuItem.active ? \'active\' : \'\']">' +
        /*                      */'<a ng-if="!hasDropdownMenu(menuItem)" ng-click="navAction(menuItem)" data-ng-class="[menuItem.style]">{{menuItem.title}}</a>' +
        /*                      */'<a ng-if="hasDropdownMenu(menuItem)" class="dropdown-toggle" data-toggle="dropdown" data-ng-class="[menuItem.style]>' +
        /*                          */'{{menuItem.title}}' +
        /*                          */' <b class="caret"></b>' +
        /*                      */'</a>' +
        /*                      */'<ul ng-if="hasDropdownMenu(menuItem)" class="dropdown-menu">' +
        /*                          */'<li ng-repeat="item in menuItem.menu" ng-class="{true: \'divider\'}[isDivider(item)]">' +
        /*                              */'<a ng-if="!isDivider(item)" ng-click="navAction(item)" data-ng-class="[menuItem.style]">{{item.title}}</a>' +
        /*                          */'</li>' +
        /*                      */'</ul>' +
        /*                  */'</li>' +
        /*              */'</ul>' +
        /*              */'<form ng-if="search.show" class="navbar-form navbar-right" role="search">' +
        /*                  */'<div class="form-group">' +
        /*                      */'<input type="text" class="form-control" placeholder="Search" ng-model="search.terms">' +
        /*                      */'<button class="btn btn-default" type="button" ng-click="searchfn()">' +
        /*                          */'<span class="glyphicon glyphicon-search"></span>' +
        /*                      */'</button>' +
        /*                  */'</div>' +
        /*              */'</form>' +
        /*          */'</div>' +
        /*      */'</div>' +
        /**/'</nav>');

});