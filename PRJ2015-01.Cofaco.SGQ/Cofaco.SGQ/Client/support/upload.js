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

        cssClass: 'upload', // wrapper css class.       
        mode: 'DOCUMENT',   // 'DOCUMENT', 'THEME'
        theme: null,        // the current selected theme.
        themes: null,       // list of available themes, for selection.
        url: '/file/{THEME-ID}',            // url pattern for file upload.
        resources: {
            dropFileText: 'arraste ficheiros para esta zona, ou clique para escolher...',
            themeSelectorLabel: 'Tema'
        }
    };

    //
    // PLUGIN-STATE -----------------------------------------------------------
    //

    var $THIS = null;
    var $ID = null;
    var $NAME = 'Upload';
    var $INIT = false;
    var $DATA = null;

    //
    // PLUGIN-ENTRY-POINT -----------------------------------------------------
    //

    $.fn[$NAME] = function () {

        //
        // On each call to plugin setup this state.
        //

        $THIS = $(this);

        //
        // Process plugin identifier.
        //

        $ID = $THIS.attr('id');

        if (typeof arguments[0] === "string") {

            //
            // Remove the command name from the arguments
            //

            var args = Array.prototype.slice.call(arguments);
            args.splice(0, 1);
            return commands[arguments[0]].apply(this, args);

        } else {

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
        $.extend($DATA[$ID].options, defaultOptions, usrOptions);

        //
        // Store a reference to the jQuery object where this plugin is hooked.
        //

        $DATA[$ID].root = $THIS;

        //
        // Store a reference to the HTML identifier.
        //

        $DATA[$ID].id = $ID;
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

        //
        // Setup plugin state.
        //

        instance.state = {};
        _selectTheme(instance, null);

        //
        // Set the main CSS class.
        //

        instance.root.addClass(instance.options.cssClass);

        switch (instance.options.mode.toUpperCase()) {

            case 'DOCUMENT':
                {
                    _selectTheme(instance, null);
                    _ui_document_mode(instance);
                }
                break;
            case 'THEME':
                {
                    _selectTheme(instance, instance.options.theme.id);
                    _ui_theme_mode(instance);
                }
                break;
            default:
                {
                    toolkit.util.Error('mode \'' + instance.options.mode + '\' is not supported', $NAME);
                }
                break;
        }
    }

    function _ui_document_mode(instance) {

        //
        // first of all, clear everything.
        //

        instance.root.empty();

        //
        // Generate the theme selector, user can choose what theme to upload.
        //

        var themeSelID = instance.id + '_theme';

        //
        // Generate options for theme selector.
        //

        var useFirst = !toolkit.util.IsDefined(instance.state.themeID);
        var options = '';

        $.each(instance.options.themes, function (idx, theme) {

            var selected = '';

            if (useFirst && 0 == idx) {

                selected = 'selected';
                _selectTheme(instance, theme.id);
            }
            else {

                selected = theme.id == instance.state.themeID ? 'selected' : '';
            }

            options += '<option value="' + theme.id + '"' + selected + '>' + theme.name + '</option>';
        });

        var html = '<div class="form-horizontal">' +
                   /*   */'<div class="form-group">' +
                   /*       */'<label for="' + themeSelID + '" class="col-sm-2 control-label">' + instance.options.resources.themeSelectorLabel + '</label>' +
                   /*       */'<div class="col-sm-10">' +
                   /*       */'<select class="form-control" id="' + themeSelID + '">' +
                   /*           */options +
                   /*       */'</select>' +
                   /*   */'</div>' +
                   '</div>';

        instance.root.append(html);

        //
        // Hookup the event for the selector.
        //

        $('#' + themeSelID).change(function () {

            _selectTheme(instance, $(this).val());
            _ui_document_mode(instance);

        });

        //
        // Generate the drop area.
        //

        _ui_drop(instance);
    }

    function _ui_theme_mode(instance) {

        //
        // first of all, clear everything.
        //

        instance.root.empty();

        //
        // Generate the theme name, as an informative message to user.
        //

        var themeNameBoxID = instance.id + '_theme';

        var themeName = instance.options.theme.name;

        var html = '<div class="form-horizontal">' +
                   /*   */'<div class="form-group">' +
                   /*       */'<label for="' + themeNameBoxID + '" class="col-sm-2 control-label">' + instance.options.resources.themeSelectorLabel + '</label>' +
                   /*       */'<div class="col-sm-10">' +
                   /*       */'<input type="text" class="form-control" value="' + themeName + '" id="' + themeNameBoxID + '" disabled>' +
                   /*   */'</div>' +
                   '</div>';

        instance.root.append(html);

        //
        // Generate the drop area.
        //

        _ui_drop(instance);
    }

    function _ui_drop(instance) {

        var dropContainerID = instance.id + '_drop';
        var dropContainer = $('<div />').attr('id', dropContainerID).addClass('dropzone');
        instance.root.append(dropContainer);

        dropContainer.dropzone(
            {
                url: instance.state.themeUrl,
                dictDefaultMessage: instance.options.resources.dropFileText,
                dictFallbackMessage: "Your browser does not support drag'n'drop file uploads.",
                dictFallbackText: "Please use the fallback form below to upload your files like in the olden days.",
                dictFileTooBig: "File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.",
                dictInvalidFileType: "You can't upload files of this type.",
                dictResponseError: "Server responded with {{statusCode}} code.",
                dictCancelUpload: "Cancel upload",
                dictCancelUploadConfirmation: "Are you sure you want to cancel this upload?",
                dictRemoveFile: "Remove file",
                dictRemoveFileConfirmation: null,
                dictMaxFilesExceeded: "You can not upload any more files."
            });
    }

    function _selectTheme(instance, themeID) {

        if (toolkit.util.IsDefined(themeID)) {

            instance.state.themeID = themeID;
            instance.state.themeUrl = instance.options.url.replace('{THEME-ID}', themeID);
        }
        else {

            instance.state.themeID = null;
            instance.state.themeUrl = null;
        }
    }

    //
    // HELPER-FUNCTIONS -------------------------------------------------------
    //

    function _hlp_getContext(id) {

        return $DATA[undefined != id && null != id ? id : $ID];
    }

}(jQuery));
