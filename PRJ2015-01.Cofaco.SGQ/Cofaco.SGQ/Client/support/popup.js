// ============================================================================
// Project: 
// Name/Class: 
// Author: 
// Create date: 
// Company: Cybermap Lta.
// Version: 1.0.0
// Description:
// ============================================================================

(function ($) {

    $.Popup = function (options) {

        var newContainer = $('<div/>');
        $('body').append(newContainer);
        $(newContainer).Popup(options);
    }

    //
    // COMMANDS ---------------------------------------------------------------
    //

    var commands = {
        'resize': _event_resize
    };

    //
    // DEFAULT-OPTIONS --------------------------------------------------------
    //

    var defaultOptions = {

        cssClass: '', // wrapper css class to user.

        style: {

            contentCssClass: null
        },

        toolbar: null,      // toolbar to display in popup
        size: 'LARGE',      // 'LARGE', 'MEDIUM', 'SMALL'
        dimention: 'AUTO',  // 'AUTO', 'FULLSCREEN', 'MAX_HEIGHT'
        title: 'Modal',     // modal title value.
        input: null,        // content to display in pop up.
        error: null,        // error handling function.
        callbacks: {
            'on-open': null,
            'on-close': null
        }
    };

    //
    // CONSTANTS --------------------------------------------------------------
    //

    var MAX_INTEGER_VAL = 9007199254740992;

    //
    // PLUGIN-STATE -----------------------------------------------------------
    //

    var $THIS = null;
    var $ID = null;
    var $NAME = 'Popup';
    var $INIT = false;
    var $DATA = null;
    var $COUNT = 0;
    var $PATTERN = '__POPUP_';

    //
    // PLUGIN-ENTRY-POINT ----------------------------------------------------
    //

    $.fn[$NAME] = function () {

        //
        // On each call to plugin setup this state.
        //

        $THIS = $(this);

        //
        // Process plugin identifier.
        //

        if ($COUNT == MAX_INTEGER_VAL) {

            $COUNT = 0;
        }

        $COUNT = $COUNT + 1;
        $ID = $PATTERN + $COUNT;
        $THIS.attr('id', $ID);

        if (typeof arguments[0] === "string") {

            //
            // Remove the command name from the arguments  
            //

            var args = Array.prototype.slice.call(arguments);
            args.splice(0, 1);
            return commands[arguments[0]].apply(this, args);
        }
        else {

            //
            // Create plugin.
            //

            if (!$INIT) {

                $INIT = true;
                $DATA = new Array();
            }

            //
            // Initialize the new instance.
            //

            _init.apply(this, arguments);

            //
            // Build the user interface.
            // 

            _ui_build($ID);
        }

        return this;
    };

    //
    // INITIALIZATION ---------------------------------------------------------
    //

    function _init(usrOptions) {

        //
        // State for plugin instance.
        //

        $DATA[$ID] = {};

        //
        // Extend/merge user options with defaults.
        //

        $DATA[$ID].options = {};
        $.extend(true, $DATA[$ID].options, defaultOptions, usrOptions);

        //
        // Store a reference to the jQuery object where this plugin is hooked.
        //

        $DATA[$ID].root = $THIS;
    }

    //
    // EVENT-HANDLERS ---------------------------------------------------------
    //

    function _event_resize(id) {

        //
        // Get the plugin context.
        //

        var instance = _hlp_getContext(id);
    }

    //
    // UI-FUNCTIONS -----------------------------------------------------------
    //

    function _ui_build(id) {

        //
        // Get the plugin context.
        //

        var instance = _hlp_getContext(id);
        instance.id = id;

        //
        // Set class for wrapper element.
        //

        instance.root.addClass(instance.options.cssClass);

        //
        // Render instance.
        //

        _ui_render(instance);
    }

    function _ui_render(instance) {

        var toolbar = toolkit.util.IsDefined(instance.options.toolbar) ? instance.options.toolbar : undefined;

        //
        // Check plugin options: If we defined the modal size and title.
        //

        var popupWrapperClass = '';
        var popupInnerClass = '';

        if (toolkit.util.IsDefined(instance.options.size)) {

            var size = toolkit.util.IsDefined(instance.options.size) ? instance.options.size.toUpperCase() : 'MEDIUM';

            switch (size) {

                case 'SMALL':
                    {
                        popupWrapperClass = ' bs-example-modal-sm';
                        popupInnerClass = ' modal-sm';
                    }
                    break;
                case 'LARGE':
                    {
                        popupWrapperClass = ' bs-example-modal-lg';
                        popupInnerClass = ' modal-lg';
                    }
                    break;
                default:
                    {
                        popupWrapperClass = ' bs-example-modal-md';
                        popupInnerClass = ' modal-md';
                    }
                    break;
            }
        }

        var title = toolkit.util.IsDefined(instance.options.title) ? instance.options.title : '';

        //
        // Start rendering HTML;
        //

        var html = '';

        //
        // Generate unique IDs.
        //

        var pluginID = instance.id;

        var popupWrapperID = pluginID + '-' + 'modal';
        var popupID = pluginID + '-' + 'popup';
        var popupDialogID = pluginID + '-' + 'popup-dialog';
        var popupContentID = pluginID + '-' + 'popup-content';
        var popupHeaderID = pluginID + '-' + 'popup-header';
        var popupDismissID = pluginID + '-' + 'popup-dismiss';
        var popupBodyID = pluginID + '-' + 'popup-body';

        var popupAppendContentID = pluginID + '-' + 'append-content';

        //
        // content css class
        //

        var popAppendContentCssClass = toolkit.util.IsDefined(instance.options.style.contentCssClass) ? ' class="' + instance.options.style.contentCssClass + '"' : '';

        //
        // Generate modal HTML.
        //

        html += '<div id="' + popupWrapperID + '" class="modal' + popupWrapperClass + '">';
        html += /*  */'<div id="' + popupDialogID + '" class="modal-dialog' + popupInnerClass + '">';
        html += /*      */'<div id="' + popupContentID + '" class="modal-content">';
        html += /*          */'<div id="' + popupHeaderID + '" class="modal-header">';
        html += /*              */'<button id="' + popupDismissID + '" type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
        html += /*              */'<h4 class="modal-title">' + title + '</h4>';
        html += /*          */'</div>';
        html += /*          */'<div id="' + popupBodyID + '" class="modal-body" style="overflow-y: auto"' + popAppendContentCssClass + '>';
        html += /*              */'<div id="' + popupAppendContentID + '" style="height: auto"' + '>';
        html += /*              */'</div>';
        html += /*          */'</div>';

        if (toolkit.util.IsDefined(toolbar)) {

            var popupFooterID = pluginID + '-' + 'popup-footer';

            html += /*          */'<div id="' + popupFooterID + '" class="modal-footer">';
            html += /*              */'<div class="clearfix">';
            html += /*                  */'<div class="pull-right">';
            html += /*                      */'<div class="btn-toolbar" role="toolbar" aria-label="...">';

            $.each(toolbar, function (idx, elm) {

                var buttonID = pluginID + '-' + 'b' + idx;

                html += /*                      */'<div class="btn-group" role="group" aria-label="..." style="margin-top: 5px">';
                html += /*                          */'<input id="' + buttonID + '" type="button" class="btn btn-default" value="' + elm.name + '"></button>';
                html += /*                      */'</div>';
            });

            html += /*                      */'</div>';
            html += /*                  */'</div>';
            html += /*              */'</div>';
            html += /*          */'</div>';
        }

        html += /*      */'</div>';
        html += /*  */'</div>';
        html += '</div>';

        instance.root.append(html);

        //
        // Check if input is an external plugin object, HTML text, or jQuery object.
        // Result will be appended to modal body.
        //

        if (typeof instance.options.input == 'object') {

            //
            // In case it is an external plugin object.
            //

            var pluginName = instance.options.input.name;
            var pluginOptions = instance.options.input.options;

            $('#' + popupAppendContentID)[pluginName](pluginOptions);
        }

        if (typeof instance.options.input == 'string') {

            //
            // In case it is HTML.
            //

            $('#' + popupAppendContentID).append(instance.options.input);
        }

        if (instance.options.input instanceof jQuery) {

            //
            // In case it is a jQuery object
            //

            $('#' + popupAppendContentID).append(instance.options.input);
        }

        //
        // Call contract for input plugin interaction with toolbar.
        //

        _cb_callBackContract(instance, toolbar, popupAppendContentID);

        //
        // Modal handling. Remove from DOM when hidden.
        //

        $('#' + popupWrapperID).modal();

        $('#' + pluginID).on('hidden.bs.modal', '.modal', function () {

            //
            // Remove popup and wrapper from DOM.
            //

            $(this).remove();
            $('#' + pluginID).remove();
        });

        //
        // Check if user specified the modal dimensions.
        // If so, we adjust the modal to the user size requirements, otherwise we just use bootstrap default values.
        //

        _ui_setPopupDimensions(instance);

        //
        // Resize event. Adjust popup according to windows dimensions.
        //

        $(window).resize(function () {

            _ui_setPopupDimensions(instance);
        });
    }

    function _ui_setPopupDimensions(instance) {

        //
        // Sets dimension acording to user options.
        //

        if (toolkit.util.IsDefined(instance.options.dimention)) {

            switch (instance.options.dimention.toUpperCase()) {

                case 'AUTO':

                    _ui_setPopupAuto(instance);
                    break;

                case 'MAX_HEIGHT':

                    _ui_setPopupMaxHeight(instance);
                    break;

                case 'MAX_WIDTH':

                    _ui_setPopupMaxWidth(instance);
                    break;

                case 'FULLSCREEN':

                    _ui_setPopupFullscreen(instance);
                    break;

                default:

                    _ui_setPopupAuto(instance);
                    break;
            }
        }
        else {

            _ui_setPopupAuto(instance);
        }
    }

    function _ui_setPopupAuto(instance) {

        var pluginID = instance.id;

        //
        // Function for "auto" user option.
        //

        var popupWrapperID = pluginID + '-' + 'modal';
        var popupDialogID = pluginID + '-' + 'popup-dialog';
        var popupContentID = pluginID + '-' + 'popup-content';
        var popupHeaderID = pluginID + '-' + 'popup-header';
        var popupBodyID = pluginID + '-' + 'popup-body';
        var popupFooterID = pluginID + '-' + 'popup-footer';

        var popupAppendContentID = pluginID + '-' + 'append-content';

        var w = $(window);

        var popupWrapper = $('#' + popupWrapperID);
        var popupDialog = $('#' + popupDialogID);
        var popupContent = $('#' + popupContentID);
        var popupHeader = $('#' + popupHeaderID);
        var popupBody = $('#' + popupBodyID);
        var popupFooter = $('#' + popupFooterID);

        var poppupAppendContent = $('#' + popupAppendContentID);

        popupWrapper.height(w.height());
        popupWrapper.find('.modal-backdrop').height(w.height());

        //
        // Handle popup height.
        //

        var verticalMargins = popupDialog.outerHeight(true) - popupDialog.innerHeight();
        var contentDiff = popupContent.outerHeight(true) - popupContent.innerHeight();
        var bodyDiff = popupBody.outerHeight(true) - popupBody.height();

        var contentHeight = poppupAppendContent.height();
        var maxHeight = w.height() - popupHeader.outerHeight(true) - popupFooter.outerHeight(true) - verticalMargins - contentDiff - bodyDiff;
        var bodyHeight = Math.min(contentHeight, maxHeight);

        popupBody.height(bodyHeight);
    }

    function _ui_setPopupMaxHeight(instance) {

        var pluginID = instance.id;

        //
        // Function for "max_height" user option.
        // Popup fills screen verticaly.
        //

        var popupWrapperID = pluginID + '-' + 'modal';
        var popupDialogID = pluginID + '-' + 'popup-dialog';
        var popupContentID = pluginID + '-' + 'popup-content';
        var popupHeaderID = pluginID + '-' + 'popup-header';
        var popupBodyID = pluginID + '-' + 'popup-body';
        var popupFooterID = pluginID + '-' + 'popup-footer';

        var popupAppendContentID = pluginID + '-' + 'append-content';

        var w = $(window);

        var popupWrapper = $('#' + popupWrapperID);
        var popupDialog = $('#' + popupDialogID);
        var popupContent = $('#' + popupContentID);
        var popupHeader = $('#' + popupHeaderID);
        var popupBody = $('#' + popupBodyID);
        var popupFooter = $('#' + popupFooterID);

        var poppupAppendContent = $('#' + popupAppendContentID);

        popupWrapper.height(w.height());
        popupWrapper.find('.modal-backdrop').height(w.height());

        popupDialog.css('margin-top', '30px');
        popupDialog.css('margin-bottom', '30px');

        var verticalMargins = popupDialog.outerHeight(true) - popupDialog.innerHeight();
        var contentDiff = popupContent.outerHeight(true) - popupContent.innerHeight();

        var popupHeight = w.height() - verticalMargins - contentDiff;

        popupContent.height(popupHeight);

        var popupBodyHeight = popupContent.outerHeight(true) - popupHeader.outerHeight(true) - popupFooter.outerHeight(true) - (verticalMargins / 2) - contentDiff;
        popupBody.height(popupBodyHeight);
    }

    function _ui_setPopupMaxWidth(instance) {

        var pluginID = instance.id;

        //
        // Function for "max_width" user option.
        // Popup fills screen horizontally.
        //

        var popupWrapperID = pluginID + '-' + 'modal';
        var popupDialogID = pluginID + '-' + 'popup-dialog';
        var popupContentID = pluginID + '-' + 'popup-content';
        var popupHeaderID = pluginID + '-' + 'popup-header';
        var popupBodyID = pluginID + '-' + 'popup-body';
        var popupFooterID = pluginID + '-' + 'popup-footer';

        var popupAppendContentID = pluginID + '-' + 'append-content';

        var w = $(window);

        var popupWrapper = $('#' + popupWrapperID);
        var popupDialog = $('#' + popupDialogID);
        var popupContent = $('#' + popupContentID);
        var popupHeader = $('#' + popupHeaderID);
        var popupBody = $('#' + popupBodyID);
        var popupFooter = $('#' + popupFooterID);

        var poppupAppendContent = $('#' + popupAppendContentID);

        popupWrapper.height(w.height());
        popupWrapper.find('.modal-backdrop').height(w.height());

        //
        // Handle popup width (screen width with margins).
        //

        popupDialog.css('margin-right', '30px');
        popupDialog.css('margin-left', '30px');

        var sideMargins = parseInt(popupDialog.css('margin-right')) + parseInt(popupDialog.css('margin-left'));

        var popupWidth = w.width() - sideMargins;

        popupDialog.width(popupWidth);

        //
        // Handle popup height.
        //

        var verticalMargins = popupDialog.outerHeight(true) - popupDialog.innerHeight();
        var contentDiff = popupContent.outerHeight(true) - popupContent.innerHeight();
        var bodyDiff = popupBody.outerHeight(true) - popupBody.height();

        var contentHeight = poppupAppendContent.height();
        var maxHeight = w.height() - popupHeader.outerHeight(true) - popupFooter.outerHeight(true) - verticalMargins - contentDiff - bodyDiff;
        var bodyHeight = Math.min(contentHeight, maxHeight);

        popupBody.height(bodyHeight);
    }

    function _ui_setPopupFullscreen(instance) {

        var pluginID = instance.id;

        //
        // Function for "fullscreen" user option.
        //

        var popupWrapperID = pluginID + '-' + 'modal';
        var popupDialogID = pluginID + '-' + 'popup-dialog';
        var popupContentID = pluginID + '-' + 'popup-content';
        var popupHeaderID = pluginID + '-' + 'popup-header';
        var popupBodyID = pluginID + '-' + 'popup-body';
        var popupFooterID = pluginID + '-' + 'popup-footer';

        var popupAppendContentID = pluginID + '-' + 'append-content';

        var w = $(window);

        var popupWrapper = $('#' + popupWrapperID);
        var popupDialog = $('#' + popupDialogID);
        var popupContent = $('#' + popupContentID);
        var popupHeader = $('#' + popupHeaderID);
        var popupBody = $('#' + popupBodyID);
        var popupFooter = $('#' + popupFooterID);

        var poppupAppendContent = $('#' + popupAppendContentID);

        popupWrapper.height(w.height());
        popupWrapper.find('.modal-backdrop').height(w.height());

        //
        // Handle popup height.
        //

        popupDialog.css('margin-top', '30px');
        popupDialog.css('margin-bottom', '30px');

        var verticalMargins = popupDialog.outerHeight(true) - popupDialog.innerHeight();
        var contentDiff = popupContent.outerHeight(true) - popupContent.innerHeight();

        var popupHeight = w.height() - verticalMargins - contentDiff;

        popupContent.height(popupHeight);

        var popupBodyHeight = popupContent.outerHeight(true) - popupHeader.outerHeight(true) - popupFooter.outerHeight(true) - (verticalMargins / 2) - contentDiff;
        popupBody.height(popupBodyHeight);

        //
        // Handle popup width (screen width with margins).
        //

        popupDialog.css('margin-right', '30px');
        popupDialog.css('margin-left', '30px');

        var sideMargins = parseInt(popupDialog.css('margin-right')) + parseInt(popupDialog.css('margin-left'));

        var popupWidth = w.width() - sideMargins;

        popupDialog.width(popupWidth);
    }

    function _ui_buttonActionHook(instance, buttonID, buttonDef, popupAppendContentID) {

        var callback = null;

        if (typeof buttonDef.action == 'function') {

            //
            // ACTION-AS-A-FUNCTION
            // Execute function and be done with it.
            // 

            callback = function (arg) {

                var result = buttonDef.action(arg);

                switch (buttonDef.native.toUpperCase()) {

                    case 'CLOSE':
                        {
                            if (result) { _ui_hidePopup(instance); }
                        }
                        break;
                }
            }
        }
        else if ((typeof buttonDef.action == 'string') && (typeof instance.options.input == 'object')) {

            //
            // ACTION-AS-A-STRING
            // This means a command for the enclosed plugin.
            // 

            callback = function (arg) {

                var command = buttonDef.action;

                var pluginName = instance.options.input.name;

                var promise = $('#' + popupAppendContentID)[pluginName](command);

                if (toolkit.util.IsDefined(promise)) {

                    promise.then(

                        function (result) {

                            if (toolkit.util.IsDefined(buttonDef.native)) {

                                //
                                // Native options for modal operation.
                                //

                                switch (buttonDef.native.toUpperCase()) {

                                    case 'CLOSE':
                                        {
                                            _ui_hidePopup(instance);
                                        }
                                        break;
                                }
                            }
                        },

                        function (err) {

                            //
                            // Display an error message.
                            //

                            _hlp_Error(instance, err);
                        });
                }
            }
        }
        else if (toolkit.util.IsDefined(buttonDef.promise)) {

            //
            // ACTION-AS-PROMISE
            // Action defined as a promise.
            //

            callback = function (arg) {

                buttonDef.promise().then(

                    function (result) {

                        if (toolkit.util.IsDefined(buttonDef.native)) {

                            //
                            // Native options for modal operation.
                            //

                            switch (buttonDef.native.toUpperCase()) {

                                case 'CLOSE':
                                    {
                                        _ui_hidePopup(instance);
                                    }
                                    break;
                            }
                        }
                    },
                    function (err) {

                        //
                        // Display an error message.
                        //

                        _hlp_Error(instance, err);
                    });
            }

        }
        else if (!toolkit.util.IsDefined(buttonDef.action)) {

            //
            // ACTION-AS-A-NATIVE-POPUP-COMMAND
            // This means a native pop command.
            // 

            callback = function (arg) {

                switch (buttonDef.native.toUpperCase()) {

                    case 'CLOSE':
                        {
                            _ui_hidePopup(instance);
                        }
                        break;
                }
            };
        }

        //
        // Register the click event on the button.
        //

        if (toolkit.util.IsDefined(callback)) {

            $('#' + buttonID).on('click', function () { callback(buttonDef); });
        }
    }

    function _ui_showPopup(instance) {

        var pluginID = instance.id;
        var popupWrapperID = pluginID + '-' + 'modal';

        $('#' + popupWrapperID).modal('show');
    }

    function _ui_hidePopup(instance) {

        var pluginID = instance.id;
        var popupWrapperID = pluginID + '-' + 'modal';

        $('#' + popupWrapperID).modal('hide');

        //
        // if user defined a callback, call it here.
        //

        onCloseCallback = instance.options.callbacks['on-close'];
        if (toolkit.util.IsDefined(onCloseCallback)) {

            onCloseCallback(instance);
        }
    }

    //
    // CALLBACK-FUNCTIONS -----------------------------------------------------
    //

    function _cb_callBackContract(instance, toolbar, popupAppendContentID) {

        var pluginID = instance.id;

        //
        // Hook toolbar elements.
        // 

        var dismissBehaviour = null;

        if (toolkit.util.IsDefined(toolbar)) {

            $.each(toolbar, function (idx, elm) {

                var buttonID = pluginID + '-' + 'b' + idx;

                _ui_buttonActionHook(instance, buttonID, elm, popupAppendContentID);

                dismissBehaviour = _model_handleDismissBehaviour(elm);
            });
        }

        //
        // Hook popup dismiss button.
        //

        var dismissButtonID = pluginID + '-' + 'popup-dismiss';

        if (toolkit.util.IsDefined(dismissBehaviour)) {

            _ui_buttonActionHook(instance, dismissButtonID, dismissBehaviour, popupAppendContentID);
        }
        else {

            _ui_buttonActionHook(instance, dismissButtonID, { native: 'close' }, popupAppendContentID);
        }
    }

    //
    // MODEL-FUNCTIONS --------------------------------------------------------
    //

    function _model_handleDismissBehaviour(toolbarElm) {

        var action = toolbarElm.action;
        var native = toolbarElm.native;

        if (toolkit.util.IsDefined(action) && toolkit.util.IsDefined(native)) {

            if (typeof action == 'string' && typeof native == 'string') {

                if (native.toUpperCase() == 'CLOSE') {

                    return toolbarElm;
                }
            }
        }

        return null;
    }

    //
    // HELPER-FUNCTIONS -------------------------------------------------------
    //

    function _hlp_Error(instance, err) {

        var handler = toolkit.util.IsDefined(instance.options.error) ? instance.options.error : alert;
        var msg = toolkit.util.IsDefined(instance.options.error) ? err : JSON.stringify(err);

        handler(msg);
    }

    function _hlp_getContext(id) {

        return $DATA[undefined != id && null != id ? id : $ID];
    }

}(jQuery));