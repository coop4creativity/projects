﻿
var appSpec = {

    //
    // META
    //

    name: 'app',
    clientID: 'ngFrontEnd',
    template: 'default',

    //
    // MODULES
    //

    modules: [
        'angular.vertilize',
        'toolkit.cms',
        'toolkit.ims',
        'toolkit.ums',
        'toolkit.charting'
    ],

    //
    // BASE-URLs
    //

    baseUrls: [
        'APP', '~/Client/BackOffice/',
        'MAIN', '~/Client/BackOffice/main/',
        'VIEWS', '[MAIN]:~/',
        'SUPPORT', '[APP]:~/support/',
        'CMS', '[APP]:~/modules/toolkit/cms/',
        'CHARTING', '[APP]:~/modules/toolkit/charting/',
        'IMS', '[APP]:~/modules/toolkit/ims/',
        'UMS', '[APP]:~/modules/toolkit/ums/',
        'UTIL', '[APP]:~/modules/toolkit/util/',
        'API', '~/_api/'
    ],

    //
    // SETTINGS
    //

    settings: [

        //
        // SERVICES
        //

        'service.tkAuthService', {
            settings: {
                loginUrl: '[API]:~/user/login'
            },

            errMsg: {
                MSG_INVALID_LOGIN_CREDENTIALS: 'Por favor preencha os campos do utilizador e password!'
            }
        },

        //
        // CONTROLLERS
        //

        'controller.tkLoginController', {
            resource: {
                logoUrl: __ICON,
                title: __NAME,
                description: __DESCRIPTION,
                userName: 'Utilizador',
                password: 'Password',
                rememberMe: 'Manter sessão',
                submit: 'Login'
            },
            setting: {
                redirectUrl: '/home'
            }
        }
    ],

    //
    // VIEWS
    //

    views: [
        {
            name: 'home',
            template: '[MAIN]:~/view.home.html',
            controller: 'home-controller'
        },
        {
            name: 'login',
            isDefault: true,
            template: '[UMS]:~/view.login.html',
            controller: 'tkLoginController'
        },
        {
            name: 'profile',
            template: '[UMS]:~/view.profile.html',
            controller: 'tkUserProfileController'
        },
        {
            name: 'entity',
            template: '[CMS]:~/view.entity.html',
            params: '/:ref/:config?',
            controller: 'tkEntityController'
        },
        {
            name: 'chart-build',
            template: '[CHARTING]:~/view.chart-builder.html',
            controller: 'tkChartBuilderController'
        },
        {
            name: 'chart-play',
            template: '[CHARTING]:~/view.chart-player.html',
            params: '/:id',
            controller: 'tkChartPlayerController'
        }
    ]
};

//
// initialize the app with angular.
//

var app = toolkit.angular.app.Create(appSpec);

//
// Previous page and login rout handling.
//

app.run(['$rootScope', '$location', 'tkAuthService', function ($rootScope, $location, tkAuthService) {

    //
    // If login is the target page and we are logged in, go to highlights.
    // If we are not logged in then it should always be directed to login page.
    //

    $rootScope.$on("$locationChangeStart", function (event, next, current) {

        var parcels = next.split('#');
        var view = null;

        if (parcels.length > 1) {

            view = parcels[1];

            if ((view == 'login' || view == '/login') && tkAuthService.authentication.isAuth) {

                $location.path('/home');

            } else if ((view != 'login' || view != '/login') && !tkAuthService.authentication.isAuth) {

                $location.path('/login');
            }
        }

    });

    //
    // Save previoues page.
    // 

    $rootScope.$on('$routeChangeSuccess', function (event, currentRoute, previousRoute) {

        $rootScope.previousPage = (angular.isDefined(previousRoute) && angular.isDefined(previousRoute.$$route)) ? previousRoute.$$route.originalPath : null;

    });

    //
    // Go to previous page if defined.
    //

    $rootScope.back = function (e) {

        if ($rootScope.previousPage != null || $rootScope.previousPage != undefined) {

            if (e != null) { e.preventDefault(); }
            window.history.back();
            return true;
        } else if (e != null) {

            return true;
        } else {

            if (e != null) { e.preventDefault(); }
            return false;
        }
    };
}]);

