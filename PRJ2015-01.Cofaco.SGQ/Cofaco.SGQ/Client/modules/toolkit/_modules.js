// ============================================================================
// Project: Toolkit Angular
// Name/Class: 
// Created On: 14/Oct/2015
// Author: João Carreiro (joao.carreiro@cybermap.pt)
// Company: Cybermap Lda.
// Description: 
// ============================================================================

"use strict";
angular.module('toolkit.core', []);
angular.module('toolkit.cms', ['toolkit', 'toolkit.core']);
angular.module('toolkit.ims', ['toolkit', 'toolkit.core']);
angular.module('toolkit.ums', ['toolkit', 'toolkit.core', 'ngSanitize']);
angular.module('toolkit.localization', ['toolkit', 'toolkit.core']);
angular.module('toolkit.logging', ['toolkit', 'toolkit.core']);
angular.module('toolkit.filesystem', ['toolkit', 'toolkit.core']);
angular.module('toolkit.components', ['toolkit', 'toolkit.core']);
angular.module('toolkit.auth', ['toolkit', 'toolkit.core', 'LocalStorageModule', 'toolkit.settings']);
angular.module('toolkit.settings', ['toolkit', 'toolkit.core']);
angular.module('toolkit.comm', ['toolkit', 'toolkit.core']);
angular.module('toolkit.blocks', ['toolkit', 'toolkit.core']);
angular.module('toolkit.ticker', ['toolkit', 'toolkit.core']);
angular.module('toolkit.packages', ['toolkit', 'toolkit.core']);
angular.module('toolkit.search', ['toolkit', 'toolkit.core']);
angular.module('toolkit.hqueue', ['toolkit', 'toolkit.core']);
angular.module('toolkit.maps', ['toolkit', 'toolkit.core']);
angular.module('toolkit.watcher', ['toolkit', 'toolkit.core']);
angular.module('toolkit.templates', ['toolkit', 'toolkit.core']);
angular.module('toolkit.webscript', ['toolkit', 'toolkit.core']);
angular.module('toolkit.types', ['toolkit', 'toolkit.core']);
angular.module('toolkit.types.forms', ['toolkit', 'toolkit.core']);
angular.module('toolkit.reporting', ['toolkit', 'toolkit.core']);
angular.module('toolkit.ui', ['toolkit', 'toolkit.core']);
angular.module('toolkit.webapi', ['toolkit', 'toolkit.core']);
angular.module('toolkit.charting', ['toolkit', 'toolkit.core', 'toolkit.cms']);
